using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using FrontEnd.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using FrontEnd.Filters;

namespace FrontEnd
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
            services.AddCookieAuthentication(options =>
            {
                options.LoginPath = "/Login";
                options.AccessDeniedPath = "/Denied";
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });

            var twitterConfig = Configuration.GetSection("twitter");
            if (twitterConfig["consumerKey"] != null)
            {
                services.AddTwitterAuthentication(options => twitterConfig.Bind(options));
            }

            var googleConfig = Configuration.GetSection("google");
            if (googleConfig["clientID"] != null)
            {
                services.AddGoogleAuthentication(options => googleConfig.Bind(options));
            }

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy =>
                {
                    policy.RequireAuthenticatedUser()
                          .RequireUserName(Configuration["admin"]);
                });
            });

            services.AddMvc(options =>
            {
                options.Filters.AddService(typeof(RequireLoginFilter));
            })
            .AddRazorPagesOptions(options =>
            {
                options.AuthorizeFolder("/Admin", "Admin");
            });

            services.AddTransient<RequireLoginFilter>();

            var httpClient = new HttpClient
            {
                BaseAddress = new Uri(Configuration["serviceUrl"])
            };
            services.AddSingleton(httpClient);
            services.AddSingleton<IApiClient, ApiClient>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
