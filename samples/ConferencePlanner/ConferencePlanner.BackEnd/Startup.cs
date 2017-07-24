using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using BackEnd.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;

namespace BackEnd
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddDbContext<ApplicationDbContext>(options =>
             {
                 if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                 {
                     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                 }
                 else
                 {
                     options.UseSqlite("Data Source=conferences.db");
                 }
             });

            services.AddMvcCore()
                .AddJsonFormatters()
                .AddApiExplorer();

            services.AddSwaggerGen(options =>
                options.SwaggerDoc("v1", new Info { Title = "Conference Planner API", Version = "v1" })
            );

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseSwagger();

            app.UseSwaggerUI(options =>
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Conference Planner API v1")
            );

            app.UseMvc();

            app.Run(context =>
            {
                context.Response.Redirect("/swagger");
                return Task.CompletedTask;
            });

            //NDCOsloData.Seed(app.ApplicationServices);
        }
    }
}
