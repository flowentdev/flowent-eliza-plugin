import { elizaLogger } from '@elizaos/core';

export interface SecurityEvent {
    timestamp: number;
    event: string;
    severity: 'low' | 'medium' | 'high';
    details: Record<string, unknown>;
}

export interface UploadMetrics {
    filePath: string;
    size: number;
    timestamp: string;
    duration?: number;
    success: boolean;
    error?: string;
}

/**
 * Logs a security event with the specified severity and details
 */
export const logSecurityEvent = (
    event: string,
    severity: SecurityEvent['severity'],
    details: Record<string, unknown>
): void => {
    const securityEvent: SecurityEvent = {
        timestamp: Date.now(),
        event,
        severity,
        details
    };

    elizaLogger.info('Security event', securityEvent);

    // For high severity events, also log as error
    if (severity === 'high') {
        elizaLogger.error('High severity security event', securityEvent);
    }
};

/**
 * Tracks upload metrics and logs them
 */
export const monitorUpload = (metrics: Omit<UploadMetrics, 'timestamp'>): void => {
    const uploadMetrics: UploadMetrics = {
        ...metrics,
        timestamp: new Date().toISOString()
    };

    elizaLogger.info('Upload metrics', uploadMetrics);

    // Log errors if present
    if (!metrics.success && metrics.error) {
        elizaLogger.error('Upload failed', {
            filePath: metrics.filePath,
            error: metrics.error
        });
    }
};

/**
 * Monitors file validation events
 */
export const monitorFileValidation = (
    filePath: string,
    validationType: string,
    isValid: boolean,
    details?: Record<string, unknown>
): void => {
    const event = isValid ? 'File validation passed' : 'File validation failed';
    const severity = isValid ? 'low' : 'medium';

    logSecurityEvent(event, severity, {
        filePath,
        validationType,
        ...details
    });
};

/**
 * Tracks cleanup operations
 */
export const monitorCleanup = (
    filePath: string,
    success: boolean,
    error?: string
): void => {
    const event = success ? 'File cleanup succeeded' : 'File cleanup failed';
    const severity = success ? 'low' : 'medium';

    logSecurityEvent(event, severity, {
        filePath,
        error
    });
}; 