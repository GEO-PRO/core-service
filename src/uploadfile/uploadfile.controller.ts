import { Body, Controller, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as moment from 'moment';
import * as fs from 'fs';
import { UploadfilesService } from './uploadfile.service';
import { join } from 'path';

@Controller('file')
export class FilesController {
    constructor(
        private readonly UploadfilesService: UploadfilesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, cb) => {
                const now = moment();
                const formattedTime = moment(now).format('DD-MM-YYYY');
                const nameSave = formattedTime + file.originalname;
                cb(null, nameSave);
            },
        }),
    }))
    async uploadFileUiWeb(@UploadedFile() file) {
        // const readStream = fs.createReadStream(file.path);
        // const writeStream = fs.createWriteStream('../ui-admin/public/images/' + file.filename);
        // readStream.pipe(writeStream);
        // const imagePath = join('images', file.filename);
        // res.sendFile(imagePath);

        // Create file database
        return this.UploadfilesService.creatFiles({ name: file.filename })
    }
}
