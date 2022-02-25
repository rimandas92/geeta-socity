import { BAD_REQUEST, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import { addPage, getPage, deletePages, editPage, nameByPage } from '../controller/page';

export const addpage = async(req, res, next)=>{
    try {
       const page = await addPage(req.body);
       res.status(OK).send(page);
    } catch (error) {
       res.status(BAD_REQUEST).send(error);

    }
};
export const getPages = async(req, res, next)=>{
    try {
       const page = await getPage();
       res.status(OK).send(page);
    } catch (error) {
        console.error(error);
    }
};
export const editPages = async(req, res, next)=>{
    const id = req.params.id;
    try {
       const page = await editPage(id,req.body);
       res.status(OK).send(page);
    } catch (error) {
        console.error(error);

    }
};

export const deletePage = async(req, res, next)=>{
    try {
       await deletePages(req.params.id);
       res.status(OK).send('Page deleted sucessfully');
    } catch (error) {
        console.error(error);

    }
};
export const getPagesByName = async(req, res, next)=>{
    try {
      const page =  await nameByPage(req.params.name);
       res.status(OK).send({
           status:true,
           message:'Page fetch successfully',
           data:page
       });
    } catch (error) {
        console.error(error);

    }
};