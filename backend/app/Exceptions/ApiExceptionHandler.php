<?php

namespace App\Exceptions;

use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Session\TokenMismatchException;
use Intervention\Image\Exception\NotReadableException;
use Symfony\Component\HttpFoundation\Exception\SuspiciousOperationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class ApiExceptionHandler
{
    protected static $statusDict = [
        ModelNotFoundException::class => [
            'message' => 'model_not_found',
            'code' => 404,
        ],
        AuthorizationException::class => [
            'message' => 'authorization_failed',
            'code' => 401,
        ],
        TokenMismatchException::class => [
            'message' => 'token_mismatch',
            'code' => 419,
        ],
        SuspiciousOperationException::class => [
            'message' => 'suspicious_operation',
            'code' => 404,
        ],
        NotReadableException::class => [
            'message' => 'invalid_format',
            'code' => 500,
        ],
        InvalidFormatException::class => [
            'message' => 'invalid_date',
            'code' => 500,
        ]
    ];

    /**
     * @param Throwable $th
     * @return JsonResponse
     */
    public static function handle(Throwable $th): JsonResponse
    {
        $isHttpException = $th instanceof HttpException;
        if (env('APP_DEBUG') == true && !$isHttpException) {
            throw $th;
        }

        $result = self::getError($th);

        $statusCode = $result['code'];
        $message = $result['message'];

        return response()->json(
            [
                'message' => $message
            ],
            $statusCode,
        );
    }

    /**
     * @param Throwable $th
     * @return array
     */
    public static function getError(Throwable $th): array
    {
        $thClass = get_class($th);

        if (array_key_exists($thClass, self::$statusDict)) {
            return [
                'message' => __('exceptions.' . self::$statusDict[$thClass]['message']),
                'code' => self::$statusDict[$thClass]['code'],
            ];
        }

        if ($th instanceof HttpException) {
            return [
                'message' => $th->getMessage(),
                'code' => $th->getStatusCode(),
            ];
        }

        return [
            'message' => __('exceptions.internal_server_error'),
            'code' => 500,
        ];
    }
}
