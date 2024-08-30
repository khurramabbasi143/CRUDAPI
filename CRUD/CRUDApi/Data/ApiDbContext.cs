using CRUDApi.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CRUDApi.Data
{
    public class ApiDbContext: DbContext
    {
        public ApiDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Contact> Contacts { get; set; }
    }
}
