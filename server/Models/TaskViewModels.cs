using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CTMServer.Models
{
    public class InnerTaskViewModel
    {
        public int Id { get; set; }
        public int Complete { get; set; }
        public string Text { get; set; }
        public string IdUser { get; set; }
    }

    public class OutTaskViewModel
    {
        public int Id { get; set; }
        public int Complete { get; set; }
        public string Text { get; set; }
    }

    public class AddTaskViewModel
    {
        public int Complete { get; set; }
        public string Text { get; set; }
    }

    public class DeleteTaskViewModel
    {
        public int Id { get; set; }
    }

    public class MakeCompleteTaskViewModel
    {
        public int Id { get; set; }
        public int Complete { get; set; }
    }






    public class TasksContext : DbContext
    {
        public TasksContext() : base("DefaultConnection")
        {

        }
        public DbSet<InnerTaskViewModel> InnerTasks { get; set; }
    }
}