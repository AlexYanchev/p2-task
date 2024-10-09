import mongoose from 'mongoose';

const connectMongoDB = (uri: string) => {
    mongoose
        .connect(uri || '')
        .then((v) => {
            console.log(`Подключились к БД ${uri.split('/').at(-1)}`);
        })
        .catch((e) => {
            console.log('Ошибка подключения к БД.', e);
        });
};

export default connectMongoDB;
