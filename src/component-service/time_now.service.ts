import { Injectable } from "@nestjs/common";

@Injectable()

export class TimeNow {
    now() {
        const moment = require('moment');
        const now = moment();
        const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');
        return formattedDate;
    }
}