import { BAD_REQUEST, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status';
import {deletePages, editPage, nameByPage, addBanners, getBanner, deleteBanners } from '../controller/banner';

export const addBanner = async(req, res, next)=>{
    try {
        const newBanner = {
            name: req.body.name,
            image: `/uploads/${
              req.files.filter((file) => file.fieldname === 'image')[0].filename
            }`
          };
       const banner = await addBanners(newBanner);
       return res
       .status(CREATED)
       .send({
         message: 'Banner created successfully',
         status: true,
         banners: banner,
       });
    } catch (error) {
       res.status(BAD_REQUEST).send(error);

    }
};
export const getBanners = async(req, res, next)=>{
    try {
       const page = await getBanner();
       res.status(OK).send(page);
    } catch (error) {
        console.error(error);
    }
};
export const deleteBanner = async(req, res, next)=>{
    try {
       const page = await deleteBanners(req.params.id);
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