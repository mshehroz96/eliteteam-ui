import { formatCurrency, formatDate, formatNumber, formatPercent } from "@angular/common";

export class Methods 
{
    
    public static customDateFormat(date: Date, format: string) {
        return formatDate(date, format, 'en-US')
    };
    public static formatCurrency(value: number) {
        return formatCurrency(value, 'en-US','$')
    };

    public static formatPercent(value: number) {
        return formatPercent(value, 'en-US', '1.2')
    };

    public static formatNumber(value: number) {
        return formatNumber(value, 'en-US', '1.2-4')
    };

    public static generateUUID() {
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    public static getUTCTime(date:Date) {
        return Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
        );
    }

    public static getUTCDateTime(date: Date) {
        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
        );
    }
}