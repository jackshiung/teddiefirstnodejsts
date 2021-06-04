class Configs {
    uploadFolder: string = __dirname + '/../uploadFiles';
    logger = {
        dirname: __dirname + '/../logs',
        filename: `%DATE%.log`,
        maxFiles: '30d'
    };
}
const configs = new Configs();
export default configs;