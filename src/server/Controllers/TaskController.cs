using CTMServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Data.Entity;

namespace CTMServer.Controllers
{
    /// <summary>
    /// This class is used for work with user tasks
    /// </summary>
    [Authorize]
    [RoutePrefix("api/Task")]
    public class TaskController : ApiController
    {
        private TasksContext tasksContext = new TasksContext();

        //GET api/Task/GetAll
        /// <summary>
        /// Returns all user tasks as List. 
        /// You can refer to this function using the following query "api/Task/GetAll"
        /// </summary>
        /// <returns>List of user tasks</returns>
        [HttpGet]
        [Route("GetAll")]
        public async Task<List<OutTaskViewModel>> GetAll()
        {
            string userId = User.Identity.GetUserId();
            try
            {
                var query = await tasksContext.InnerTasks
                    .Where(x => x.IdUser.Equals(userId)).ToListAsync();


                var res = new List<OutTaskViewModel>();
                foreach (var val in query)
                {
                    res.Add(new OutTaskViewModel
                    {
                        Id = val.Id,
                        Complete = val.Complete,
                        Text = val.Text
                    });
                }
                return res;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        // POST api/Task/Add
        /// <summary>
        /// Returns user task if it added in database.
        /// You can refer to this function using the following query "api/Task/Add"
        /// </summary>
        /// <param name="task">User task from client</param>
        /// <returns>New user task</returns>
        [HttpPost]
        [Route("Add")]
        public async Task<OutTaskViewModel> AddTask(AddTaskViewModel task)
        {

            var newTask = new InnerTaskViewModel
            {
                Complete = task.Complete,
                Text = task.Text,
                IdUser = User.Identity.GetUserId()
            };

            try
            {
                tasksContext.InnerTasks.Add(newTask);
                var q = await tasksContext.SaveChangesAsync();


                return new OutTaskViewModel
                {
                    Id = newTask.Id,
                    Complete = newTask.Complete,
                    Text = newTask.Text
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // POST api/Task/Edit
        /// <summary>
        /// Returns user task if it changed in database.
        /// You can refer to this function using the following query "api/Task/Edit"
        /// </summary>
        /// <param name="task">Changed user task from client</param>
        /// <returns>Changed user task</returns>
        [HttpPost]
        [Route("Edit")]
        public async Task<OutTaskViewModel> EditTask(OutTaskViewModel task)
        {
            try
            {
                var entity = await tasksContext.InnerTasks.FindAsync(task.Id);
                if (entity.IdUser.Equals(User.Identity.GetUserId()))
                {
                    entity.Complete = task.Complete;
                    entity.Text = task.Text;
                    tasksContext.Entry(entity).State = EntityState.Modified;
                    await tasksContext.SaveChangesAsync();
                    return task;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // POST api/Task/Delete
        ///<summary>
        /// Delete user task from database.
        /// You can refer to this function using the following query "api/Task/Delete"
        /// </summary>
        /// <param name="task">Deleted task from client</param>
        /// <returns>HttpResult</returns>

        [HttpPost]
        [Route("Delete")]
        public async Task<IHttpActionResult> DeleteTask(DeleteTaskViewModel task)
        {
            try
            {
                var entity = await tasksContext.InnerTasks.FindAsync(task.Id);
                if (entity.IdUser.Equals(User.Identity.GetUserId()))
                {
                    tasksContext.InnerTasks.Remove(entity);
                    await tasksContext.SaveChangesAsync();
                }
                return Ok();

            }
            catch (Exception e)
            {
                return InternalServerError();
            }
        }

        //PUT api/Task/MakeComplete
        /// <summary>
        /// Does the task performed in the database.
        /// You can refer to this function using the following query "api/Task/MakeComplete"
        /// </summary>
        /// <param name="task">Changed user task from client</param>
        /// <returns>Changed user task</returns>
        [HttpPost]
        [Route("MakeComplete")]
        public async Task<OutTaskViewModel> MakeComplete(MakeCompleteTaskViewModel task)
        {
            try
            {
                var entity = await tasksContext.InnerTasks.FindAsync(task.Id);
                if (entity.IdUser.Equals(User.Identity.GetUserId()))
                {
                    entity.Complete = task.Complete;
                    tasksContext.Entry(entity).State = EntityState.Modified;
                    await tasksContext.SaveChangesAsync();
                    return new OutTaskViewModel
                    {
                        Id = entity.Id,
                        Complete = entity.Complete,
                        Text = entity.Text
                    };
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }


        }

        // GET api/Task/DeleteCompletedTasks
        /// <summary>
        /// Delete all performed tasks from database.
        /// You can refer to this function using the following query "api/Task/DeleteCompletedTasks"
        /// </summary>
        /// <returns>Return HttpResult</returns>
        [HttpGet]
        [Route("DeleteCompletedTasks")]
        public async Task<IHttpActionResult> DeleteCompletedTasks()
        {
            string userId = User.Identity.GetUserId();

            try
            {
                var entity = await tasksContext.InnerTasks
                    .Where(x => x.IdUser.Equals(userId) && x.Complete == 1)
                    .ToListAsync();
                foreach (var val in entity)
                {
                    tasksContext.InnerTasks.Remove(val);
                }
                await tasksContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError();
            }

        }

    }
}