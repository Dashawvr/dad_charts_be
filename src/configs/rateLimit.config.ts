import { RateLimit } from '../constants/enums/rateLimit.enum';

export const rateLimitOptions = {
    windowMs: RateLimit.MINUTES * RateLimit.SECONDS * RateLimit.MILLISECONDS,
    max: 1000
};
