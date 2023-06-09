// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract TaskContract {

  // Task : { id: 0, taskText: 'clean', isDeleted: false }
  // what we need to run this with frontend?
  // DEPLOYED Contract address
  // ABI

  // events
  event AddTask(address recipient, uint taskId);
  event DeleteTask( uint taskId, bool isDeleted);

  // struct of Task
  struct Task {
    uint id;
    string taskText;
    bool isDeleted;
  }

  // store this task data in array of task variable and make it private
  Task [] private tasks;
  // task.push( { id: 0, taskText: 'clean', isDeleted: false })

  // mapping : TaskToOwner
  mapping(uint256 => address) taskToOwner;

  // example : {0: '0xrahul...7z'} , {1: '0xsuchit...7z'} 


  function addTask( string memory taskText,bool isDeleted) external{
    // get id or length of task array
    // push new task
    // attatch task id to owner address
    // emit AddTask event

    uint taskId = tasks.length;
    tasks.push(Task(taskId, taskText, isDeleted));
    taskToOwner[taskId] = msg.sender;
    emit AddTask(msg.sender, taskId);
  }

  // how we are calling this func from frontend ?
  // TaskContract.addTask('walk the dog', false)

  // get task that are mine and not delated
  function getMyTask() external view returns(Task[] memory){
    
      // create new temp array to get all task
      // add new variable counter and initialized value 0
      // loop through the real array task and add in new temp array
      // 1. cheack if login address is mine and the task is not delated and push in temp array 
      // or set that task in that position--> this is another way to push ( temp[counter] = task[i])

    Task[] memory temporary = new Task[](tasks.length);
    uint counter =0;

    // temporary [{taskText:'hello', isDeleted:false,empty }]

    for(uint i =0; i < tasks.length; i++){
      if(taskToOwner[i] == msg.sender && tasks[i].isDeleted == false){
        temporary[counter] = tasks[i]; //push
        counter ++;
      }
    }

    // store task in result
    Task[] memory result = new Task[](counter);  //result has length of new counter
    for(uint i=0; i < counter; i++){
      result[i] = temporary[i];
    }

    return result;
    
  }

  // in reality, we're nor deleting anything, we just set delated value via id == true and in our getmyTask filtering so in getmy task they are noy showned. bcz in blockchain you can't delate anything.
  
  function deleteTask(uint taskId, bool isDeleted) external {

    // check taskOwner[taskId] is eqal to login address
    // set the id value isdealted true
    // emit event

    if(taskToOwner[taskId] == msg.sender){
      tasks[taskId].isDeleted = isDeleted;
      emit DeleteTask(taskId, isDeleted);
    }
  }
  // how we are calling this func from frontend ?
  // TaskContract.deleteTask(0, true).
  
}
