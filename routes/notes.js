let express = require('express');
let router = express.Router();

/**
 * @swagger
 * /sticky_notes/create:
 *   post:
 *     summary: Create a new Notes
 *     tags:
 *       - Sticky Notes
 *     description: To add a new Notes
 *     produces:
 *       - application/json 
 *     parameters: 
 *       - title: title
 *         content: notes content
 *         in: body
 *         schema:
 *           $ref: '#/definitions/createNotes'
 *     responses:
 *       200:
 *         description: Successfully registered
 */

/**
 * @swagger
 * definitions:
 *   createNotes:
 *     properties:
 *       title:
 *         type: string
 *         default: "title"
 *       content:
 *         type: string
 *         default: "content"
 */

router.post('/create', function (req, res) {
    try {
        console.log("Sucessfully Created");
        notesModel.create(req.body, function (err, succ) {
            if (succ) {
                let result = { code: HttpStatus.OK, errorcode: 0, success: true, data: succ, message: "Notes Created Successfully" };
                res.json(result);
            } else {
                let result = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: err };
                res.json(result);
            }
        })
    } catch (e) {
        let data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: e.message, data: e.message };
        res.json(data);
    }
});

/**
 * @swagger
 * /sticky_notes/update/{title}:
 *   put:
 *     summary: Update the notes by title
 *     tags:
 *       - Sticky Notes
 *     description: notes update by title
 *     produces:
 *       - application/json 
 *     parameters: 
 *       - name: title
 *         in: path
 *         type: string
 *         required: true
 *         description: title
 *       - name: content
 *         description: content
 *         in: body
 *         schema:
 *           $ref: '#/definitions/updateNotes'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

/**
 * @swagger
 * definitions:
 *   updateNotes:
 *     properties:
 *       title:
 *         type: string
 *         default: "title"
 *       content:
 *         type: string
 *         default: "content"
 */

router.put('/update/:title', function (req, res) {
    try {
        console.log(req.body);
        let data = { code: "400", message: "Error", data: "" };
        console.log(data)
        notesModel.update(req.body.title, req.body, function (err, result) {
            if (err) {
                let Data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Unable to update the notes", data: err };
                res.json(Data);
            } else {
                let Data = { code: HttpStatus.OK, errorcode: 0, success: true, auth: true, data: result, message: "Notes Updated Successfully" };
                res.json(Data);
            }
        });
    } catch (e) {

        let data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Unexpected error occured", data: e.message };
        res.json(data);
    }
});


/**  
 * @swagger
 * /sticky_notes/getAllNotes:
 *   get:
 *     summary: Get all notes
 *     tags:
 *       - Sticky Notes       
 *     description:  Get all the notes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully received the notes list.
 */

router.get('/getAllNotes/', function (req, res, next) {
    try {
        notesModel.getAllNotes(function (error, response) {
            if (error) {
                let result = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Failed - Data not recived !" };
                res.json(result);
            } else {
                let message = "Retrieved the Notes.";
                let code = HttpStatus.OK;
                let errorcode = 0;
                let success = true;
                if (response.length <= 0) {
                    message = "Notes not found !";
                    code = HttpStatus.BAD_REQUEST;
                    errorcode = 1;
                    success = false;
                }
                let result = { code: code, errorcode: errorcode, success: success, message: message, data: response };
                res.json(result);
            }
        });
    } catch (e) {
        let data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Error", data: e.message };
        res.json(data);
    }
});


/**  
 * @swagger
 * /sticky_notes/getNotesDetails/{title}:
 *   get:
 *     summary: Get single notes
 *     tags:
 *       - Sticky Notes       
 *     description:  Get a particular notes
 *     produces:
 *       - application/json
 *     parameters: 
 *       - name: title
 *         description: title
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully received the notes detail
 */

router.get('/getNotesDetails/:title',function (req, res) {
    try {
        let title = req.params.title
        console.log(title);
        notesModel.getNotesDetails(title, function (error, response) {
            if (error) {
                let result = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Failed - Data not recived !" };
                res.json(result);
            } else {
                let message = "Retrieved the Details.";
                let code = HttpStatus.OK;
                let errorcode = 0;
                let success = true;
                console.log(response);
                if (response == null) {
                    message = "Details not found !";
                    code = HttpStatus.BAD_REQUEST;
                    errorcode = 1;
                    success = false;
                }
                else{
                let result = { code: code, errorcode: errorcode, success: success, message: message, data: response };
                res.json(result);
                }
            }
        });
    } catch (e) {
        let data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Error", data: e.message };
        res.json(data);
    }
});

/**
 * @swagger
 * /sticky_notes/delete/{title}:
 *   put:
 *     summary: Delete the notes by title
 *     tags:
 *       - Sticky Notes
 *     description: notes delete by title
 *     produces:
 *       - application/json 
 *     parameters: 
 *       - name: title
 *         in: path
 *         type: string
 *         required: true
 *         description: title
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

 router.put('/delete/:title', function (req, res) {
    try {
        notesModel.delete(req.body.title, req.body, function (err, result) {
            if (err) {
                let Data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Unable to get the notes", data: err };
                res.json(Data);
            } else {
                let Data = { code: HttpStatus.OK, errorcode: 0, success: true, auth: true, data: result, message: "Notes deleted Successfully" };
                res.json(Data);
            }
        });
    } catch (e) {

        let data = { code: HttpStatus.BAD_REQUEST, errorcode: 1, success: false, message: "Unexpected error occured", data: e.message };
        res.json(data);
    }
});

module.exports=router;