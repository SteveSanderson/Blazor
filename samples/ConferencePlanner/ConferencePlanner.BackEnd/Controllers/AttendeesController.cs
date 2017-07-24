using System.Collections.Generic;
using System.Threading.Tasks;
using BackEnd.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd
{
    [Route("/api/[controller]")]
    public class AttendeesController : Controller
    {
        private readonly ApplicationDbContext _db;

        public AttendeesController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> Get(string username)
        {
            var attendee = await _db.Attendees.Include(a => a.Sessions)
                                              .SingleOrDefaultAsync(a => a.UserName == username);

            if (attendee == null)
            {
                return NotFound();
            }

            var result = attendee.MapAttendeeResponse();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ConferenceDTO.Attendee input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var attendee = new Attendee
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                UserName = input.UserName
            };

            _db.Attendees.Add(attendee);
            await _db.SaveChangesAsync();

            var result = attendee.MapAttendeeResponse();

            return CreatedAtAction(nameof(Get), new { username = result.UserName }, result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var attendee = new Attendee { ID = id };

            _db.Attendees.Remove(attendee);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{username}/session/{sessionId:int}")]
        public async Task<IActionResult> AddSession(string username, int sessionId)
        {
            var attendee = await _db.Attendees.Include(a => a.Sessions)
                                              .Include(a => a.ConferenceAttendees)
                                                .ThenInclude(ca => ca.Conference)
                                              .SingleOrDefaultAsync(a => a.UserName == username);

            if (attendee == null)
            {
                return NotFound();
            }

            var session = await _db.Sessions.FindAsync(sessionId);

            if (session == null)
            {
                return BadRequest();
            }

            attendee.Sessions.Add(session);

            await _db.SaveChangesAsync();

            var result = attendee.MapAttendeeResponse();

            return Ok(result);
        }

        [HttpDelete("{username}/session/{sessionId:int}")]
        public async Task<IActionResult> RemoveSession(string username, int sessionId)
        {
            var attendee = await _db.Attendees.SingleOrDefaultAsync(a => a.UserName == username);

            if (attendee == null)
            {
                return NotFound();
            }

            var session = await _db.Sessions.FindAsync(sessionId);

            if (session == null)
            {
                return BadRequest();
            }

            attendee.Sessions.Remove(session);

            await _db.SaveChangesAsync();

            var result = attendee.MapAttendeeResponse();

            return NoContent();
        }
    }
}