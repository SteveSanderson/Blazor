using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    public class SessionsController : Controller
    {
        private readonly ApplicationDbContext _db;

        public SessionsController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sessions = await _db.Sessions.AsNoTracking()
                                             .Include(s => s.Track)
                                             .Include(s => s.SessionSpeakers)
                                                .ThenInclude(ss => ss.Speaker)
                                             .Include(s => s.SessionTags)
                                                .ThenInclude(st => st.Tag)
                                             .ToListAsync();

            var results = sessions.Select(s => MapSessionResponse(s));

            return Ok(results);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            var session = await _db.Sessions.AsNoTracking()
                                            .Include(s => s.Track)
                                            .Include(s => s.SessionSpeakers)
                                                .ThenInclude(ss => ss.Speaker)
                                            .Include(s => s.SessionTags)
                                                .ThenInclude(st => st.Tag)
                                            .SingleOrDefaultAsync(s => s.ID == id);

            if (session == null)
            {
                return NotFound();
            }

            var result = MapSessionResponse(session);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ConferenceDTO.Session input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var session = new Session
            {
                Title = input.Title,
                ConferenceID = input.ConferenceID,
                StartTime = input.StartTime,
                EndTime = input.EndTime,
                Abstract = input.Abstract,
                TrackId = input.TrackId
            };

            _db.Sessions.Add(session);
            await _db.SaveChangesAsync();

            var result = session.MapSessionResponse();

            return CreatedAtAction(nameof(Get), new { id = result.ID }, result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put([FromRoute]int id, [FromBody]ConferenceDTO.Session input)
        {
            var session = await _db.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            session.ID = input.ID;
            session.Title = input.Title;
            session.Abstract = input.Abstract;
            session.StartTime = input.StartTime;
            session.EndTime = input.EndTime;
            session.TrackId = input.TrackId;
            session.ConferenceID = input.ConferenceID;

            await _db.SaveChangesAsync();

            var result = session.MapSessionResponse();

            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var session = await _db.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            _db.Sessions.Remove(session);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private static ConferenceDTO.SessionResponse MapSessionResponse(Session session)
        {
            return session.MapSessionResponse();
        }
    }
}
