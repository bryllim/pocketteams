const asyncHandler = require("express-async-handler");
const SectionOrder = require("../models/SectionOrderModel");
const Section = require("../models/SectionModel");
const Task = require("../models/TaskModel");

const createSectionOrder = asyncHandler( async (req,res) => {
    const { section_order_name} = req.body;

    if(!section_order_name){
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const sectionOrder = new SectionOrder({user: req.user._id, section_order_name});
        const createdSectionOrder = await sectionOrder.save();
        res.status(201).json(createdSectionOrder);
    }
});

const getSectionOrders = asyncHandler( async (req,res) => {
    const sections = await SectionOrder.find().populate('items')

    res.json(sections);
});

const getSectionOrderById = asyncHandler( async (req,res) => {
    const sectionOrder = await SectionOrder.findById(req.params.id).populate({
        path: 'items',
        populate: {
            path: 'tasks',
        }
    })
    // const section = await Section.find( { $in: sectionOrder._id}).populate('tasks')
    if(sectionOrder){


        // sectionOrder.items = section;
        res.json(sectionOrder);
    } else {
        res.status(404).json({message: "section not found"});
    }
});

const updateSectionOrder = asyncHandler(async (req,res) => {
    const {sourceDragIndex,destinationDragIndex,sectionId} = req.body;
    const sectionOrderId = req.params.id

    const sectionOrder = await SectionOrder.findById(sectionOrderId);

    // const section = await Section.findById()
    console.log(sectionOrderId)

    //Check if this SectionOrder belongs to the user
    if(sectionOrder.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }
    if(sectionOrder){
        const [removed] = sectionOrder.items.splice(sourceDragIndex,1) //mutating the array
        sectionOrder.items.splice(destinationDragIndex,0,removed)
        console.log('sectionOrder')
        console.log(sectionOrder.items)
        const updatedSectionOrder = await sectionOrder.save();
        res.json(updatedSectionOrder);
    } else {
        res.status(404);
        throw new Error("SectionOrder not found");
    }
});

const deleteSectionOrder = asyncHandler(async (req,res) => {
    const sectionOder = await SectionOrder.findById(req.params.id);

    if(sectionOder.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    if(sectionOder){
        await sectionOder.remove();
        res.json({message: "SectionOrder Removed"});
    }
    
});


const updateSectionOrderItems = asyncHandler(async (req,res) => {

    const {destinationSectionOrderId,sourceDragindex,destinationDragindex,type} = req.body;

    const sectionOrder = await SectionOrder.findById(req.params.id);

    sectionOrderItems = sectionOrder.items


    //Check if this SectionOrder belongs to the user
    if(section.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }
    if(sectionOrder){
        const [removedItem] = sectionOrderItems.splice(sourceDragindex,1) //possible error
        sectionOrderItems.splice(destinationDragindex,0,removedItem)
    }
    else {
        res.status(404);
        throw new Error("SectionOrder not found");
    }
})
  

//     sections.splice(sectionOldIndex, 1);
//     sections.splice(sectionNewIndex, 0, section);

//     if(section){
//         const updatedSectionOrder = await sections.save();
//         res.json(updatedSectionOrder);
//     } else {
//         res.status(404);
//         throw new Error("SectionOrder not found");
//     }
// });

// const updateSectionOrderTask = asyncHandler(async (req,res) => {
//     console.log("Updat SectionOrder Task")

//     const {sourceSectionOrderId, destinationSectionOrderId,sourceDragindex,destinationDragindex,type} = req.body;
//     const taskId = req.params.id
//     // console.log(taskId)
//     // console.log(sourceSectionOrderId)
//     // console.log(destinationSectionOrderId)
//     const task = await Task.findById(taskId);
//     const sectionSource = await SectionOrder.findById(sourceSectionOrderId);
//     const sectionDestination = await SectionOrder.findById(destinationSectionOrderId);


//     //Check if this SectionOrder belongs to the user
//     if(sectionSource.user.toString() !== req.user._id.toString()){
//         res.status(401);
//         throw new Error("You can't perform this action");
//     }

//     if(type === 'column'){
//         const sourceData = await SectionOrder.findById(taskId)

//         .remove()

//     }

//     if(task && sectionSource && sectionDestination){
//         const sourceTasks = [...sectionSource.tasks]
//         const destinationTasks = [...sectionDestination.tasks]
//         task.section_id = destinationSectionOrderId;

        

//         // const filteredTasks = sourceTasks.filter(obj => 
//         //     obj._id === taskId
//         // )
//         if(sourceSectionOrderId === destinationSectionOrderId){
//             destinationTasks.splice(sourceDragindex,1)
//             destinationTasks.splice(destinationDragindex,0,taskId)
//             sectionDestination.tasks = destinationTasks
//             await sectionDestination.save();
//         }
        
//         else{
//             sourceTasks.splice(sourceDragindex,1)
//             destinationTasks.splice(destinationDragindex,0,taskId)
//             sectionSource.tasks = sourceTasks
//             sectionDestination.tasks = destinationTasks
//             await sectionSource.save();
//             await sectionDestination.save();
//         }

        
 


//         console.log(sectionDestination.tasks)
//         console.log(sectionSource.tasks)
//         console.log(sourceSectionOrderId)
//         console.log(destinationSectionOrderId)
//         // console.log(sourceTasks)
//         // console.log(destinationTasks)
     


//         await task.save();
  
    
    
      
//         res.json(sectionDestination);

//     } else {
//         res.status(404);
//         throw new Error("SectionOrder not found");
//     }
// });

// module.exports = {createSectionOrder, getSectionOrders,getSectionOrderById, updateSectionOrder, deleteSectionOrder,updateSectionOrderOrder,updateSectionOrderTask};

module.exports = {createSectionOrder,getSectionOrders,updateSectionOrder,deleteSectionOrder,updateSectionOrderItems,getSectionOrderById}