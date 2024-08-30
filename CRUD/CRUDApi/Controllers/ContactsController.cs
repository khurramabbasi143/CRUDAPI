
using CRUDApi.Data;
using CRUDApi.Models;
using CRUDApi.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRUDApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ApiDbContext dbcontext;

        public ContactsController(ApiDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        public IActionResult GetAllContacts()
        {
            var contact = dbcontext.Contacts.ToList();
            return Ok(contact);
        }

        [HttpPost]
        public  IActionResult AddContact(AddContactRequestDTO request)
        {
          var domainMOdelContact = new Contact
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email   = request.Email,
                Phone   =   request.Phone,
                Favourite= request.Favourite

            };
            dbcontext.Contacts.Add(domainMOdelContact);
            dbcontext.SaveChanges();
            return  Ok(domainMOdelContact);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteContact(Guid id)
        {
            var contact = dbcontext.Contacts.Find(id);
            if(contact is not null)
            {
                dbcontext.Contacts.Remove(contact);
                dbcontext.SaveChanges();
            }
            return Ok();
        }

    }
}
