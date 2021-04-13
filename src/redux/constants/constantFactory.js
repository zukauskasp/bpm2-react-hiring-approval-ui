export const createAsyncActionTypes = prefix => ({
    START: `${prefix}_REQUEST_BEGIN`,
    SUCCESS: `${prefix}_REQUEST_SUCCESS`,
    FAILURE: `${prefix}_REQUEST_FAILURE`,
});