import { Response } from 'express';
import { Return } from './type';

export function returnTemplate(
    res: Response,
    httpStatus: number,
    status: string,
    message: string,
    data: any = null,
): Response {
    const returnData: Return = {status, message}
    if (data) returnData.data = data
    // console.log(returnData)
    return res.status(httpStatus).send(returnData);
}
