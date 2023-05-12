import { UploadfilesService } from './uploadfile.service';
export declare class FilesController {
    private readonly UploadfilesService;
    constructor(UploadfilesService: UploadfilesService);
    uploadFileUiWeb(file: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | import("../entity/blogs/files.entity").Files[]>;
}
