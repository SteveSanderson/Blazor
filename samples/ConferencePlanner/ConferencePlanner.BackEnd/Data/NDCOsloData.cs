using System;
using System.Collections.Generic;
using BackEnd.Data;
using Microsoft.Extensions.DependencyInjection;

namespace BackEnd
{
    public static class NDCOsloData
    {
        private class SessionData
        {
            public string Name { get; set; }

            public string[] Speakers { get; set; }

            public string Track { get; set; }

            public string Abstract { get; set; }
        }

        private class SessionGroup 
        {
            public DateTimeOffset StartTime { get; set; }

            public SessionData[] Sessions { get; set; }
        }

        public static void Seed(IServiceProvider services)
        {
            // TODO: Make this like, good, and only in Dev
            using (var scope = services.CreateScope())
            {
                var db = scope.ServiceProvider.GetService<ApplicationDbContext>();

                db.Database.EnsureDeleted();
                db.Database.EnsureCreated();

                // Conference
                var conference = new Conference { Name = "NDC Oslo 2017" };
                db.Conferences.Add(conference);

                // Speakers
                var speakers = new[] {
                    "Dylan Beattie",
                    "Andy Davies",
                    "Mathew McLoughlin",
                    "Adam Cogan",
                    "Scott Wlaschin",
                    "Ian Cooper",
                    "David Ostrovsky",
                    "Elle Waters",
                    "Brock Allen",
                    "Dominick Baier",
                    "Nicolai Josuttis",
                    "Nicholas Blumhardt",
                    "Steve Simpson",
                    "Erlend Wiig",
                    "Henrik Feldt",
                    "Lynn Langit",
                    "Martin Andersen",
                    "Anders Breivik",
                    "Bjørn Egil Hansen",
                    "Tomas Jansson",
                    "Simon Brown",
                    "Damian Edwards",
                    "David Fowler",
                    "Andreas Fertig",
                    "Diane Zajac-Woodie",
                    "​Steve Faulkner",
                    "Emil Cardell",
                    "Vagif Abilov",
                    "Aleksander Stensby",
                    "Udi Dahan",
                    "Romeu Moura",
                    "​Kathleen Dollard",
                    "Emily Bache",
                    "Tomas Jansson ",
                    "Mathias Brandewinder",
                    "Jonathan Martin",
                    "Rajpal Wilkhu",
                    "Benjamin Hodgson",
                    "Andrea Magnorsky",
                    "Boyan Mihaylov",
                    "Scott Allen",
                    "Damian Brady",
                    "Sam Newman",
                    "Dror Helper",
                    "Denise Jacobs",
                    "Jessie Shternshus",
                    "Petter Hesselberg",
                    "Cecilia Wirén",
                    "Edith Harbaugh",
                    "Erik Wendel",
                    "Francis Paulin",
                    "Christian Johansen",
                    "Woody Zuill",
                    "Jon Skeet",
                    "Phil Nash",
                    "Josh Lane",
                    "Philip Laureano",
                    "Norm Johanson",
                    "Serg Hospodarets",
                    "Steve Sanderson",
                    "Hubert Matthews",
                    "Hagai Barel",
                    "Heather Downing",
                    "Hugo Cruz",
                    "Einar W. Høst",
                    "Jonas Winje",
                    "Christian Wenz",
                    "Adam Ralph",
                    "Dina Goldshtein",
                    "Simon Jäger",
                    "Björn Fahller",
                    "Edward Thomson",
                    "Rita Zhang",
                    "Johnny Winn",
                    "Barry Dorrans",
                    "Dian Fay",
                    "Ben Hall",
                    "Reginald Braithwaite",
                    "Sasha Goldshtein",
                    "Todd Gardner",
                    "Anthony Borton",
                    "Nikolai Andersen",
                    "Mark Rendle",
                    "David Christiansen",
                    "Natalia An",
                    "Josh Wulf",
                    "Lars Kristian Hagen",
                    "Prahlad Wulf",
                    "Scott Helme",
                    "Eran Stiller",
                    "David Vujic",
                    "Joe Stead",
                    "Duncan Hunter",
                    "Adam Stephensen",
                    "Daniel Plaisted",
                    "Tiffany Rad",
                    "Patricia Aas",
                    "Mathias Brandewinder ",
                    "David Lindblad",
                    "Cristian Prieto",
                    "Adam Sitnik",
                    "Jessica Kerr",
                    "James Lewis",
                    "Erik Engheim",
                    "Viktorija Almazova",
                    "​Chris Klug",
                    "Jahn Arne Johnsen",
                    "Nigel Parker",
                    "Alfonso Garcia-Caro",
                    "Halvor Sakshaug",
                    "Gemma Cameron",
                    "Jad Joubran",
                    "Kylie Hunt",
                    "Maximiliano Firtman",
                    "Brendan Forster",
                    "Filip Ekberg",
                    "Steffen Forkmann",
                    "​Richard Campbell",
                    "​Carl Franklin",
                    "Rob Conery",
                    "Mark Volkmann",
                    "Troy Hunt",
                    "Nicole Saidy",
                    "Spencer Schneidenbach",
                    "Mete Atamel",
                    "Lars Klint",
                    "Christer Veland Aas",
                    "Felienne",
                    "Martin Abbott",
                    "James Montemagno",
                    "Doc Norton",
                    "Magnus Mårtensson",
                    "Todd Fine",
                    "Martin Hinshelwood",
                    "Benny Michielsen",
                    "Hans Peeters",
                    "​Michele Bustamante ",
                    "Tess Ferrandez",
                    "Christina Aldan",
                    "Asbjørn Ulsberg",
                    "Stefan Magnus Landrø",
                    "Sara Robinson",
                    "Karl Krukow",
                    "Einar Afiouni",
                    "Andreas Ahlgren",
                    "Filip Van Laenen",
                    "Ronald Mavarez",
                    "Christian Brevik",
                    "Ken Grønnbeck",
                    "Jon Galloway",
                    "Magnus Stuhr",
                    "Ståle Heitmann",
                    "Pavneet Singh Saund",
                    "Eirik Langholm Vullum",
                    "Sebastien Lambla",
                    "Gleb Bahmutov",
                    "Erika Carlson",
                    "Elton Stoneman",
                    "Allen Holub",
                    "Daniel Marbach",
                    "Samantha Langit",
                    "Martin Gravåk",
                    "Kristian Wille",
                    "Jimmy Bogard",
                    "Robert Smallshire ",
                    "Barry Luijbregts",
                    "Ben Cull",
                    "Stephen Haunts",
                    "Erlend Hamberg",
                    "Kate Devlin",
                    "Sandeep Singh",
                    "Karoline Klever",
                    "Lyndsey Padget",
                    "Joakim Lindh",
                };

                var speakerLookup = new Dictionary<string, Speaker>();
                foreach (var s in speakers)
                {
                    var speaker = new Speaker
                    {
                        Name = s
                    };
                    db.Speakers.Add(speaker);
                    speakerLookup[s] = speaker;
                }

                // Tracks
                var tracks = new[] {
                    "Expo",
                    "Room 1",
                    "Room 2",
                    "Room 3",
                    "Room 4",
                    "Room 5",
                    "Room 6",
                    "Room 7",
                    "Room 8",
                    "Room 9",
                    "Workshop/Room 10"
                };

                var trackLookup = new Dictionary<string, Track>();
                foreach (var t in tracks)
                {
                    var track = new Track
                    {
                        Conference = conference,
                        Name = t
                    };
                    db.Tracks.Add(track);
                    trackLookup[t] = track;
                }

                void AddSessions(SessionGroup group)
                {
                    var end = group.StartTime + TimeSpan.FromHours(1);
                    foreach (var s in group.Sessions)
                    {
                        var session = new Session
                        {
                            Conference = conference,
                            Title = s.Name,
                            StartTime = group.StartTime,
                            EndTime = end,
                            Track = trackLookup[s.Track],
                            Abstract = s.Abstract
                        };

                        session.SessionSpeakers = new List<SessionSpeaker>();
                        foreach (var sp in s.Speakers)
                        {
                            session.SessionSpeakers.Add(new SessionSpeaker
                            {
                                Session = session,
                                Speaker = speakerLookup[sp]
                            });
                        }

                        db.Sessions.Add(session);
                    }
                }

                // Sessions

                var sessionGroups = new List<SessionGroup>();

                // 9:00 - 10:00
                var startTime = new DateTimeOffset(2017, 6, 14, 9, 0, 0, TimeSpan.FromHours(1));

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[] {
                        new SessionData { Name = "Keynote: Are There Any Questions?", Speakers = new[] { "Dylan Beattie" }, Track = "Expo",
                            Abstract = @"Not this time. At NDC Oslo 2017, we're going to turn things upside-down and do the questions right at the beginning. Because, for as long as human beings have existed, we've asked questions. Questions about the world around us. Questions about the past, about the future, about our place in the universe. As our world moves online, the search for answers has become inextricably linked with the history, and the future, of software development. The earliest mechanical calculating machines were built to answer questions - to solve complex mathematical problems many thousands of times faster than their human operators.

Today, in the age of connected devices and machine learning, we live in a world where humans ask questions and expect computers to have the answers. So let's take this chance to ask some of the really big questions: Who are we? How did we get here? How is modern software changing the way we interact with the world around us? Where are the really big questions in modern software development - and who's working on them? And how will those questions shape the future of our relationship with the machines that have become such an important part of our lives?" }
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[] {
                        new SessionData { Name = "Keep you data safe in a containerized application", Speakers = new[] { "Hagai Barel" }, Track = "Room 1" },
                        new SessionData { Name = "Building for Alexa with Web API", Speakers = new[] { "Heather Downing" }, Track = "Room 2" },
                        new SessionData { Name = "How to use real-time statistics to pinpoint website performance issues and enhance user experiences", Speakers = new[] { "Hugo Cruz" }, Track = "Room 3" },
                        new SessionData { Name = "Live Lambda Calculus", Speakers = new[] { "Einar W. Høst","Jonas Winje" }, Track = "Room 4" },
                        new SessionData { Name = "Web Application Security Risks: A Look at OWASP Top Ten 2017", Speakers = new[] { "Christian Wenz" }, Track = "Room 5" },
                        new SessionData { Name = "What is .NET Standard?", Speakers = new[] { "Adam Ralph" }, Track = "Room 6" },
                        new SessionData { Name = "ETW - Monitor Anything, Anytime, Anywhere", Speakers = new[] { "Dina Goldshtein" }, Track = "Room 7" },
                        new SessionData { Name = "The Future of Calling Microsoft APIs", Speakers = new[] { "Simon Jäger" }, Track = "Room 8" },
                        new SessionData { Name = "Using Trompeloeil - a mocking framework for modern C++", Speakers = new[] { "Björn Fahller" }, Track = "Room 9" },
                    }
                });

                // Friday
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(2),
                    Sessions = new[] {
                        new SessionData { Name = "Building ASP.NET apps on Google Cloud", Speakers = new[] { "Mete Atamel" }, Track = "Room 1" },
                        new SessionData { Name = "HoloLens Development: The Next Steps", Speakers = new[] { "Lars Klint" }, Track = "Room 2" },
                        new SessionData { Name = "Beautiful apps with Fuse using your XAML and JavaScript skills", Speakers = new[] { "Christer Veland Aas" }, Track = "Room 3" },
                        new SessionData { Name = "Programming is writing is programming", Speakers = new[] { "Felienne" }, Track = "Room 4" },
                        new SessionData { Name = "Hack Your Career", Speakers = new[] { "Troy Hunt" }, Track = "Room 5" },
                        new SessionData { Name = "Sensors, data and dashboards: Azure IoT end-to-end", Speakers = new[] { "Martin Abbott" }, Track = "Room 6" },
                        new SessionData { Name = "TBA", Speakers = new[] { "Sam Newman" }, Track = "Room 7" },
                        new SessionData { Name = "Building Connected & Disconnected Mobile Apps", Speakers = new[] { "James Montemagno" }, Track = "Room 8" },
                        new SessionData { Name = "Dynamic Teams - Fluidity for the win", Speakers = new[] { "Doc Norton" }, Track = "Room 9" }
                    }
                });

                // 10:20 - 11:20
                startTime = startTime + TimeSpan.FromHours(1) + TimeSpan.FromMinutes(20);

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[]
                    {
                        new SessionData { Name = "Building a Serverless, EventSourced Slack clone", Speakers = new[] { "Andy Davies" }, Track = "Room 1",
                            Abstract = @"EventSourcing and Serverless are all the rage at the moment, and everyone loves Slack...so lets build a Slack clone using the two technologies!
This talk will go through the implementation, looking at a number of interesting integration properties that EventSourcing gives us, and how we can utilise AWS Lambda to make our service very scalable with very little effort" },
                        new SessionData { Name = "Thinking in Events", Speakers = new[] { "Mathew McLoughlin" }, Track = "Room 2",
                            Abstract = @"The CRUD mentality made its way into our industry over the past few years, often being looked to as the solution to all our architectural needs.
But it turns out this model doesn't always fit. It's often the case that the systems we work on are just a representation of the real world events that are happening within the business we are modelling. This isn't a problem that CRUD is very good at solving. In this talk I'll discuss the advantages of looking at your system as a distinct series of events and how doing so can help you better model your domain. I'll also talk about how this will change the way you write the software, how it changes the way your users will use the software and how it can ultimately lead to a better experience all around."},
                        new SessionData { Name = "What’s New in VS 2017 + VS Code", Speakers = new[] { "Adam Cogan" }, Track = "Room 3",
                            Abstract = @"Visual Studio 2017 is a great step forward in developer productivity, thanks to a new/refreshing/cool/awesome change of attitude, Microsoft is embracing the winning tools in the development space and is building them into the next version of Visual Studio. The open sourcing of .NET Core and ASP.NET Core along with the release of the free Visual Studio Community Edition and Visual Studio Code gives developers lots of choice as to which IDE to use.
Come see Adam give you a tour of all the sexy new features in Visual Studio 2017 and Team Foundation Server 2017. This session is guaranteed to make you even more productive and highlight why Visual Studio is still the best IDE for developing software." },
                        new SessionData { Name = "F# for C# programmers", Speakers = new[] { "Scott Wlaschin" }, Track = "Room 4",
                            Abstract = @"Curious about F# and want to understand how is it different from C#?
In this talk, we'll look at the basics of coding in F#, and how functional programming differs from object-oriented programming. Along the way, there will be many examples showing the same code written in C# and F# so that you can see for yourself how the two languages differ in style and approach." },
                        new SessionData { Name = "Creating A .NET Renaissance", Speakers = new[] { "Ian Cooper" }, Track = "Room 5",
                            Abstract = @"The .NET platform has been in decline over the last four years, losing half if its available positions in server-side development. In this presentation we look at the data behind that decline and ask what happened and what can we do to reverse it.
In 201I, Bob Eel called for a Java Renaissance to capitalize on new developments on the Java platform and fight off the competition from frameworks like Ruby on Rails. The numbers show that Renaissance having an impact on server-side Java development, and many web scale companies have returned to Java for their server workloads.

Can we make a similar move in .NET and create a renaissance that will see .NET taking a role server-side in web scale deployments?

Part-history lesson, and part call to action, this talk tries to set out where we could go, if the community can create a .NET Renaissance around the .NET Core developments." },
                        new SessionData { Name = "Stream Data Processing for Fun and Profit", Speakers = new[] { "David Ostrovsky" }, Track = "Room 6",
                            Abstract = @"Software systems today have to handle increasingly large streams of incoming data, whether it’s user interactions with a web page, events generated by sensors, or messages sent by different system components. Oftentimes, this data loses value over time, becomes irrelevant or stale, which makes handling events quickly and reliably not just desirable, but critical. However, building a system that can process hundreds of thousands, or millions, of events per second without compromising either speed or reliability is a major engineering challenge. This is where distributed data processing frameworks come in.
In this session, we’ll talk about stream data processing: where it originated, how it works, when to use it, how to build robust stream processing applications, and the tools available to us. We’ll examine the two most popular platforms used in the industry today: Apache Storm and Apache Spark, as well as some interesting up-and-coming frameworks like Flink, Kafka Streams, Apex and Microsoft Orleans Streams. Each uses a conceptually different approach, has a plethora of features, and works (or doesn’t) best for different use-cases. Understanding how and when to use which streaming data framework is key to building a reliable, scalable, robust system and avoiding painful and costly redesigns down the road." },
                        new SessionData { Name = "Accessibility for UX: Don't worry, it's much worse than you think", Speakers = new[] { "Elle Waters" }, Track = "Room 7",
                            Abstract = @"Create an easy-to-use experience that delights your user and reinforces the value of your business? Got it. Make all your designs adaptive to prepare for any and all devices that may be thrown your way? Check! Get leaner, get personalized, get localized, and oh, don’t forget to account for seniors, and low-literacy users. Well, okay. Also, have you considered people with disabilities? Wait… what?
When we think about all that goes into mastering good design principles, it’s no wonder that tackling accessibility can appear like a daunting, unrealistic burden. How can we consider all of these highly technical, specific user needs when we don’t even know how people with disabilities use the web? How do we incorporate accessibility into a rapidly evolving design process that’s literally sprinting towards releases? And what about the Internet of Things? Is it time to give up?!

In this session, we'll embark on a tremulous journey through the wilderness of the Web Content Accessibility Guidelines and deep into the mire of assistive technologies. But, stay the course! Before you know it, you’ll feel the warm comforting rays of a heat map once again. After this experience, you’ll be equipped with five simple but powerful techniques you can integrate into your daily work. Calling all usability testers, all content strategists, and all visual and interaction designers. Ready? Grab your wires, and let’s go!" },
                        new SessionData { Name = "Implementing authorization in web applications and APIs", Speakers = new[] { "Brock Allen","Dominick Baier" }, Track = "Room 8",
                            Abstract = @"Authentication is easy – authorization is the hard part. This might sound daunting, but since every application is different, there is no single recipe for how authorization has to work.
Dominick & Brock walk you through a couple of approaches and pitfalls and use the new ASP.NET Core authorization API (which has been back-ported to standard .NET) as an example of a decent abstraction layer for clean authorization for your applications. But we will also learn that that regardless of your approach, there is no one size that fits all – that’s why it important to understand your options." },
                        new SessionData { Name = "C++17, part 1: The Language Features", Speakers = new[] { "Nicolai Josuttis" }, Track = "Room 9",
                            Abstract = @"C++17 is around the corner.
After feature freeze in June 2016, currently the final details are specified. This talk presents all the new language features C++17 will have. Besides the motivation and context of these features examples and background information demonstrate how to benefit from them in practice." },
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[]
                    {
                        new SessionData { Name = "Swift For The Curious", Speakers = new[] { "Phil Nash" }, Track = "Room 1" },
                        new SessionData { Name = "Deep Dive into Git", Speakers = new[] { "Edward Thomson" }, Track = "Room 2" },
                        new SessionData { Name = "Build Your Own Face Detection Bot", Speakers = new[] { "Rita Zhang" }, Track = "Room 3" },
                        new SessionData { Name = "What To Expect When You Are Elixiring", Speakers = new[] { "Johnny Winn" }, Track = "Room 4" },
                        new SessionData { Name = "Security in ASP.NET Core 2.0", Speakers = new[] { "Barry Dorrans" }, Track = "Room 5" },
                        new SessionData { Name = "Exploiting Relationship Graphs to Isolate Tenant Data", Speakers = new[] { "Dian Fay" }, Track = "Room 6" },
                        new SessionData { Name = "Scaling Docker Containers using Kubernetes and Azure Container Service", Speakers = new[] { "Ben Hall" }, Track = "Room 7" },
                        new SessionData { Name = "First Class Commands: The 2017 Edition", Speakers = new[] { "Reginald Braithwaite" }, Track = "Room 8" },
                        new SessionData { Name = "Investigating C++ Applications in Production on Linux and Windows", Speakers = new[] { "Sasha Goldshtein" }, Track = "Room 9" },
                    }
                });

                // Friday
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(2),
                    Sessions = new[]
                    {
                        new SessionData { Name = "ARM FTW – Azure Resource Manager For The Win", Speakers = new[] { "Magnus Mårtensson" }, Track = "Room 1" },
                        new SessionData { Name = "Azure Functions and Microsoft Cognitive Services Computer Vision API", Speakers = new[] { "Todd Fine" }, Track = "Room 2" },
                        new SessionData { Name = "Building big teams with Nexus", Speakers = new[] { "Martin Hinshelwood" }, Track = "Room 3" },
                        new SessionData { Name = "Taming the Web with Cowboy & Coyote", Speakers = new[] { "Johnny Winn" }, Track = "Room 4" },
                        new SessionData { Name = "Imposter Syndrome: Overcoming Self-Doubt in Success", Speakers = new[] { "Heather Downing" }, Track = "Room 5" },
                        new SessionData { Name = "The blockchain: what, why and how", Speakers = new[] { "Benny Michielsen","Hans Peeters" }, Track = "Room 6" },
                        new SessionData { Name = "Goodbye history tables, hello full audit - exploring message streams and event sourcing", Speakers = new[] { "​Michele Bustamante " }, Track = "Room 7" },
                        new SessionData { Name = "Beyond step-by step debugging in Visual Studio", Speakers = new[] { "Tess Ferrandez" }, Track = "Room 8" },
                        new SessionData { Name = "User Experience at Every Level of Business", Speakers = new[] { "Christina Aldan" }, Track = "Room 9" },
                        new SessionData { Name = "Get Better With All Things Git", Speakers = new[] { "Asbjørn Ulsberg" }, Track = "Workshop/Room 10" },
                    }
                });

                // 11:40 - 12:40
                startTime = startTime + TimeSpan.FromHours(1) + TimeSpan.FromMinutes(20);

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[]
                    {
                        new SessionData { Name = "Serilog: Instrumentation that Works for You", Speakers = new[] { "Nicholas Blumhardt" }, Track = "Room 1" },
                        new SessionData { Name = "Efficient Time Series with PostgreSQL", Speakers = new[] { "Steve Simpson" }, Track = "Room 2" },
                        new SessionData { Name = "Becoming the bottleneck", Speakers = new[] { "Erlend Wiig" }, Track = "Room 3" },
                        new SessionData { Name = "Suave – zero to hero of HTTP APIs", Speakers = new[] { "Henrik Feldt" }, Track = "Room 4" },
                        new SessionData { Name = "Serverless - reality or BS - notes from the trenches", Speakers = new[] { "Lynn Langit" }, Track = "Room 5" },
                        new SessionData { Name = "Lightning talks", Speakers = new[] { "Martin Andersen","Anders Breivik","Bjørn Egil Hansen","Tomas Jansson" }, Track = "Room 6" },
                        new SessionData { Name = "Visualise, document and explore your software architecture", Speakers = new[] { "Simon Brown" }, Track = "Room 7" },
                        new SessionData { Name = "What’s new in ASP.NET Core 2.0", Speakers = new[] { "Damian Edwards","David Fowler" }, Track = "Room 8" },
                        new SessionData { Name = "Fast and Small - What are the Costs of Language Features", Speakers = new[] { "Andreas Fertig" }, Track = "Room 9" },
                        new SessionData { Name = "Stop Building Useless Software", Speakers = new[] { "Diane Zajac-Woodie" }, Track = "Workshop/Room 10" },
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[]
                    {
                        new SessionData { Name = "The Developer’s Guide to Promoting Their Work", Speakers = new[] { "Todd Gardner" }, Track = "Room 1" },
                        new SessionData { Name = "From zero to hero using Visual Studio Team Service", Speakers = new[] { "Anthony Borton" }, Track = "Room 2" },
                        new SessionData { Name = "Debugging and Profiling .NET Core Apps on Linux", Speakers = new[] { "Sasha Goldshtein" }, Track = "Room 3" },
                        new SessionData { Name = "Using F# on Azure Functions in Production", Speakers = new[] { "Nikolai Andersen" }, Track = "Room 4" },
                        new SessionData { Name = "TBA", Speakers = new[] { "Mark Rendle" }, Track = "Room 5" },
                        new SessionData { Name = "Lightning talks", Speakers = new[] { "David Christiansen","Natalia An","Josh Wulf","Lars Kristian Hagen","Prahlad Wulf" }, Track = "Room 6" },
                        new SessionData { Name = "Emerging Web Security Standards", Speakers = new[] { "Scott Helme" }, Track = "Room 7" },
                        new SessionData { Name = "C++ Unit testing - the good, the bad & the ugly", Speakers = new[] { "Dror Helper" }, Track = "Room 9" },
                    }
                });


                // Friday
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(2),
                    Sessions = new[]
                    {
                        new SessionData { Name = "Terraform - colonising Azure!", Speakers = new[] { "Stefan Magnus Landrø" }, Track = "Room 1" },
                        new SessionData { Name = "Analyzing 33 million bike trips with BigQuery", Speakers = new[] { "Sara Robinson" }, Track = "Room 2" },
                        new SessionData { Name = "Visual Studio Mobile Center: Fast and Fun Continuous Delivery for Mobile apps", Speakers = new[] { "Karl Krukow" }, Track = "Room 3" },
                        new SessionData { Name = " Scaling Serverless F# with Azure Functions", Speakers = new[] { "Mathias Brandewinder " }, Track = "Room 4" },
                        new SessionData { Name = "Banish Your Inner Critic v2.0", Speakers = new[] { "Denise Jacobs" }, Track = "Room 5" },
                        new SessionData { Name = "Lightning talks", Speakers = new[] { "Einar Afiouni","Andreas Ahlgren","Filip Van Laenen","Ronald Mavarez","Christian Brevik" }, Track = "Room 6" },
                        new SessionData { Name = "High Performance API on Kubernetes", Speakers = new[] { "Ken Grønnbeck" }, Track = "Room 7" },
                        new SessionData { Name = "Talk: Open Source Software Foundations: Not Totally Boring, Actually Super Awesome", Speakers = new[] { "Jon Galloway" }, Track = "Room 8" },
                    }
                });

                // 13:40 - 14:40
                startTime = startTime + TimeSpan.FromHours(2);

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[]
                    {
                        new SessionData { Name = "Going Serverless with GraphQL", Speakers = new[] { "​Steve Faulkner" }, Track = "Room 1" },
                        new SessionData { Name = "AB-tests, lies, damned lies, and statistics.", Speakers = new[] { "Emil Cardell" }, Track = "Room 2" },
                        new SessionData { Name = "Composing high performance process workflows with Akka Streams", Speakers = new[] { "Vagif Abilov" }, Track = "Room 3" },
                        new SessionData { Name = "Data magic with the Elastic stack!", Speakers = new[] { "Aleksander Stensby" }, Track = "Room 4" },
                        new SessionData { Name = "Microservices and Rules Engines – a blast from the past", Speakers = new[] { "Udi Dahan" }, Track = "Room 5" },
                        new SessionData { Name = "Domain Invariants & Property-Based Testing for the Masses", Speakers = new[] { "Romeu Moura" }, Track = "Room 6" },
                        new SessionData { Name = "Functional Techniques for C#", Speakers = new[] { "​Kathleen Dollard" }, Track = "Room 7" },
                        new SessionData { Name = "End-to-End Automated Testing in a Microservices Architecture", Speakers = new[] { "Emily Bache" }, Track = "Room 8" },
                        new SessionData { Name = "C++17 part 2: The Library Features", Speakers = new[] { "Nicolai Josuttis" }, Track = "Room 9" },
                        new SessionData { Name = "Functional Programming Lab Hour", Speakers = new[] { "Tomas Jansson ","Mathias Brandewinder" }, Track = "Workshop/Room 10" },
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[]
                    {
                        new SessionData { Name = "Keeping the Noisy Neighbors Happy", Speakers = new[] { "Eran Stiller" }, Track = "Room 1" },
                        new SessionData { Name = "JavaScript in 2017: You might (not) need a framework", Speakers = new[] { "David Vujic" }, Track = "Room 2" },
                        new SessionData { Name = ".NET Blub: Frameworks beyond Microsoft", Speakers = new[] { "Joe Stead" }, Track = "Room 3" },
                        new SessionData { Name = "Angular War Stories", Speakers = new[] { "Duncan Hunter","Adam Stephensen" }, Track = "Room 4" },
                        new SessionData { Name = "Optimism and the Growth Mindset", Speakers = new[] { "Reginald Braithwaite" }, Track = "Room 5" },
                        new SessionData { Name = "How to stop worrying and love MSBuild", Speakers = new[] { "Daniel Plaisted" }, Track = "Room 6" },
                        new SessionData { Name = "What’s hot in web development", Speakers = new[] { "Steve Sanderson" }, Track = "Room 7" },
                        new SessionData { Name = "Tools and Technical Analysis of the Hacking in Mr. Robot: Is the Hacking “Hollywood” or Real Life?", Speakers = new[] { "Tiffany Rad" }, Track = "Room 8" },
                        new SessionData { Name = "Linux Security and How Web Browser Sandboxes Really Work", Speakers = new[] { "Patricia Aas" }, Track = "Room 9" },
                        new SessionData { Name = "Functional Programming Lab Hour", Speakers = new[] { "Tomas Jansson ","Mathias Brandewinder " }, Track = "Workshop/Room 10" },
                    }
                });

                // Friday
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(2),
                    Sessions = new[]
                    {
                        new SessionData { Name = "Multi-container applications with .NET Core on Kubernetes", Speakers = new[] { "Magnus Stuhr","Ståle Heitmann" }, Track = "Room 1" },
                        new SessionData { Name = "Practical Empathy: Unlock the Super Power", Speakers = new[] { "Pavneet Singh Saund" }, Track = "Room 2" },
                        new SessionData { Name = "JavaScript Metaprogramming - ES6 Proxy Use and Abuse", Speakers = new[] { "Eirik Langholm Vullum" }, Track = "Room 3" },
                        new SessionData { Name = "ReST 3.0 – A lap around HTTP Apis' next generation", Speakers = new[] { "Sebastien Lambla" }, Track = "Room 4" },
                        new SessionData { Name = "Building a Serverless API With Google, Firebase and PostgreSQL", Speakers = new[] { "Rob Conery" }, Track = "Room 5" },
                        new SessionData { Name = "It's not your parents' HTTP", Speakers = new[] { "Gleb Bahmutov" }, Track = "Room 6" },
                        new SessionData { Name = "Extending and Optimizing Xamarin.Forms Mobile Apps", Speakers = new[] { "James Montemagno" }, Track = "Room 8" },
                        new SessionData { Name = "Better: Fearless Feedback for Software Teams", Speakers = new[] { "Erika Carlson" }, Track = "Room 9" },
                        new SessionData { Name = "Functional Programming Lab Hour", Speakers = new[] { "Tomas Jansson ","Mathias Brandewinder " }, Track = "Workshop/Room 10" },
                    }
                });

                // 15:00 - 16:00
                startTime = startTime + TimeSpan.FromHours(1) + TimeSpan.FromMinutes(20);

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[]
                    {
                        new SessionData { Name = "What CRDTs, distributed editing and the speed of light means to your writer friends.", Speakers = new[] { "Jonathan Martin" }, Track = "Room 1" },
                        new SessionData { Name = "From Monolith to Serverless", Speakers = new[] { "Rajpal Wilkhu" }, Track = "Room 2" },
                        new SessionData { Name = "Using C#'s Type System Effectively", Speakers = new[] { "Benjamin Hodgson" }, Track = "Room 3" },
                        new SessionData { Name = "Inviting everyone to the party", Speakers = new[] { "Andrea Magnorsky" }, Track = "Room 4" },
                        new SessionData { Name = "Design principles and implementation strategies for better offline experience", Speakers = new[] { "Boyan Mihaylov" }, Track = "Room 5" },
                        new SessionData { Name = "Building Resilient Applications In Microsoft Azure", Speakers = new[] { "Scott Allen" }, Track = "Room 6" },
                        new SessionData { Name = "Cleaning the Sewage out of your DevOps Pipeline", Speakers = new[] { "Damian Brady" }, Track = "Room 7" },
                        new SessionData { Name = "Microservices", Speakers = new[] { "Sam Newman" }, Track = "Room 8" },
                        new SessionData { Name = "Working with C++ Legacy Code", Speakers = new[] { "Dror Helper" }, Track = "Room 9" },
                        new SessionData { Name = "Speak Up! and Make Your Message Stick - Part I", Speakers = new[] { "Denise Jacobs","Jessie Shternshus" }, Track = "Workshop/Room 10" },
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[]
                    {
                        new SessionData { Name = "Building intelligent bots", Speakers = new[] { "David Lindblad" }, Track = "Room 1" },
                        new SessionData { Name = "TBA", Speakers = new[] { "Cristian Prieto" }, Track = "Room 2" },
                        new SessionData { Name = "State of the .NET Performance", Speakers = new[] { "Adam Sitnik" }, Track = "Room 3" },
                        new SessionData { Name = "Develop Your Development Automation", Speakers = new[] { "Jessica Kerr" }, Track = "Room 4" },
                        new SessionData { Name = "Betting on Performance: A note on Hypothesis-driven Performance Testing", Speakers = new[] { "James Lewis" }, Track = "Room 5" },
                        new SessionData { Name = "Keeping it Simple With Go", Speakers = new[] { "Erik Engheim" }, Track = "Room 6" },
                        new SessionData { Name = "Abusing C# More", Speakers = new[] { "Jon Skeet" }, Track = "Room 7" },
                        new SessionData { Name = "Everything You Always Wanted to Know About Azure Security But Were Afraid to Ask", Speakers = new[] { "Viktorija Almazova" }, Track = "Room 8" },
                        new SessionData { Name = "Aurelia vs “just Angular” a.k.a “the framework formerly known as Angular 2”", Speakers = new[] { "​Chris Klug" }, Track = "Room 9" },
                    }
                });

                // Friday
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(2),
                    Sessions = new[]
                    {
                        new SessionData { Name = "The Hybrid Docker Swarm: Mashing Windows and Linux Apps with Containers", Speakers = new[] { "Elton Stoneman" }, Track = "Room 1" },
                        new SessionData { Name = "TBA", Speakers = new[] { "Allen Holub" }, Track = "Room 2" },
                        new SessionData { Name = "Microservices with Service Fabric. Easy... or is it?", Speakers = new[] { "Daniel Marbach" }, Track = "Room 3" },
                        new SessionData { Name = "FAKE + Paket – PowerTools for .NET developers", Speakers = new[] { "Steffen Forkmann" }, Track = "Room 4" },
                        new SessionData { Name = "Cancer Genomics - a biologist and a developer", Speakers = new[] { "Samantha Langit","Lynn Langit" }, Track = "Room 5" },
                        new SessionData { Name = "#ToyFail: Is your child safe from the Internet of Things?", Speakers = new[] { "Martin Gravåk","Kristian Wille" }, Track = "Room 6" },
                        new SessionData { Name = "Compositional UIs - the Microservices Last Mile", Speakers = new[] { "Jimmy Bogard" }, Track = "Room 7" },
                        new SessionData { Name = "Coroutine Concurrency in Python 3 with asyncio", Speakers = new[] { "Robert Smallshire " }, Track = "Room 8" },
                        new SessionData { Name = "Adopting open source in your organization", Speakers = new[] { "Edward Thomson" }, Track = "Room 9" },
                    }
                });

                // 16:20 - 17:20
                startTime = startTime + TimeSpan.FromHours(1) + TimeSpan.FromMinutes(20);

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[]
                    {
                        new SessionData { Name = "Paying taxes for fun and profit", Speakers = new[] { "Petter Hesselberg" }, Track = "Room 1" },
                        new SessionData { Name = "Become a Visual Studio Ninja", Speakers = new[] { "Cecilia Wirén" }, Track = "Room 2" },
                        new SessionData { Name = "When Feature flags go bad", Speakers = new[] { "Edith Harbaugh" }, Track = "Room 3" },
                        new SessionData { Name = "Beyond JavaScript Frameworks: Writing Reliable Web Apps With Elm", Speakers = new[] { "Erik Wendel" }, Track = "Room 4" },
                        new SessionData { Name = "Getting real(time) with Akka.NET, React and Redux", Speakers = new[] { "Francis Paulin" }, Track = "Room 5" },
                        new SessionData { Name = "I put 7 years of meal data in Datomic - Here's what I learned", Speakers = new[] { "Christian Johansen" }, Track = "Room 6" },
                        new SessionData { Name = "The State of NoEstimates", Speakers = new[] { "Woody Zuill" }, Track = "Room 7" },
                        new SessionData { Name = "C# 7", Speakers = new[] { "Jon Skeet" }, Track = "Room 8" },
                        new SessionData { Name = "Functional C++ for Fun & Profit", Speakers = new[] { "Phil Nash" }, Track = "Room 9" },
                        new SessionData { Name = "Speak Up! and Make Your Message Stick - Part II", Speakers = new[] { "Denise Jacobs","Jessie Shternshus" }, Track = "Workshop/Room 10" },
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[]
                    {
                        new SessionData { Name = "TBA", Speakers = new[] { "Dylan Beattie","Mark Rendle" }, Track = "Room 1" },
                        new SessionData { Name = "Technology just killed the company - all hail the platforms", Speakers = new[] { "Jahn Arne Johnsen" }, Track = "Room 2" },
                        new SessionData { Name = "Take Control of the Data of You", Speakers = new[] { "Nigel Parker" }, Track = "Room 3" },
                        new SessionData { Name = "Conquer the JavaScript ecosystem with F# and Fable!", Speakers = new[] { "Alfonso Garcia-Caro" }, Track = "Room 4" },
                        new SessionData { Name = "Microservices and the Inverse Conway Manoeuvre", Speakers = new[] { "James Lewis" }, Track = "Room 5" },
                        new SessionData { Name = "Don't worry, your credit card details are safe. BTW your kid is missing!", Speakers = new[] { "Halvor Sakshaug" }, Track = "Room 6" },
                        new SessionData { Name = "Visualisation", Speakers = new[] { "Gemma Cameron" }, Track = "Room 7" },
                        new SessionData { Name = "The (Awesome) Future of Web Apps", Speakers = new[] { "Jad Joubran" }, Track = "Room 8" },
                        new SessionData { Name = "Crappy to Happy: Strategies to Help You Kick Butt at Work", Speakers = new[] { "Kylie Hunt" }, Track = "Room 9" },
                    }
                });

                // Friday
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(2),
                    Sessions = new[]
                    {
                        new SessionData { Name = "Building a Global App With Azure PaaS", Speakers = new[] { "Barry Luijbregts" }, Track = "Room 1" },
                        new SessionData { Name = " Identity Server 4 with Angular and ASP.NET Core", Speakers = new[] { "Ben Cull" }, Track = "Room 2" },
                        new SessionData { Name = "Scaling Agile in your Organization with the Spotify Model", Speakers = new[] { "Stephen Haunts" }, Track = "Room 3" },
                        new SessionData { Name = "Servant: Web APIs at the Type Level", Speakers = new[] { "Erlend Hamberg" }, Track = "Room 4" },
                        new SessionData { Name = "Sex Robots", Speakers = new[] { "Kate Devlin" }, Track = "Room 5" },
                        new SessionData { Name = "Goodbye REST; Hello GraphQL", Speakers = new[] { "Sandeep Singh" }, Track = "Room 6" },
                        new SessionData { Name = "GDPR is coming, are you prepared?", Speakers = new[] { "Karoline Klever" }, Track = "Room 7" },
                        new SessionData { Name = "Badass 101", Speakers = new[] { "Lyndsey Padget" }, Track = "Room 8" },
                        new SessionData { Name = "The state of IoT in 2017 and how Norwegian Technology make IoT Easy", Speakers = new[] { "Joakim Lindh" }, Track = "Room 9" },
                    }
                });

                // 17:40 - 18:40
                startTime = startTime + TimeSpan.FromHours(1) + TimeSpan.FromMinutes(20);

                // Wed
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime,
                    Sessions = new[]
                    {
                        new SessionData { Name = "Azure Cosmos DB - The Best NoSQL Database You're Probably Not Using (Yet)", Speakers = new[] { "Josh Lane" }, Track = "Room 1" },
                        new SessionData { Name = "Easy Eventual Consistency with Actor Models + Amazon Web Services", Speakers = new[] { "Philip Laureano" }, Track = "Room 2" },
                        new SessionData { Name = "AWS Serverless with .NET Core", Speakers = new[] { "Norm Johanson" }, Track = "Room 3" },
                        new SessionData { Name = "Domain Modeling Made Functional", Speakers = new[] { "Scott Wlaschin" }, Track = "Room 4" },
                        new SessionData { Name = "ASP.NET Core Futures Roadmap", Speakers = new[] { "Damian Edwards","David Fowler" }, Track = "Room 5" },
                        new SessionData { Name = "CSS Houdini - from CSS variables to JavaScript and back", Speakers = new[] { "Serg Hospodarets" }, Track = "Room 6" },
                        new SessionData { Name = "Life, Liberty and the Pursuit of APIness : The Secret to Happy Code", Speakers = new[] { "Dylan Beattie" }, Track = "Room 7" },
                        new SessionData { Name = "ASP.NET Core for Angular, React, and Knockout developers", Speakers = new[] { "Steve Sanderson" }, Track = "Room 8" },
                        new SessionData { Name = "C++ Performance and Optimisation", Speakers = new[] { "Hubert Matthews" }, Track = "Room 9" },
                    }
                });

                // Thurs
                sessionGroups.Add(new SessionGroup
                {
                    StartTime = startTime.AddDays(1),
                    Sessions = new[]
                    {
                        new SessionData { Name = "The Web lands in the Virtual and Mixed Realities", Speakers = new[] { "Maximiliano Firtman" }, Track = "Room 1" },
                        new SessionData { Name = "Getting Started with Electron", Speakers = new[] { "Brendan Forster" }, Track = "Room 2" },
                        new SessionData { Name = "Successful Code Sharing Principles for Mobile Development", Speakers = new[] { "Filip Ekberg" }, Track = "Room 3" },
                        new SessionData { Name = "Modern app development with Fable and React Native", Speakers = new[] { "Steffen Forkmann" }, Track = "Room 4" },
                        new SessionData { Name = ".NET Rocks Panel Discussion: Going Serverless", Speakers = new[] { "​Richard Campbell","​Carl Franklin","Lynn Langit","Mathias Brandewinder ","Rob Conery" }, Track = "Room 5" },
                        new SessionData { Name = "Flow - Am I Your Type?", Speakers = new[] { "Mark Volkmann" }, Track = "Room 6" },
                        new SessionData { Name = "Something Something Cyber", Speakers = new[] { "Troy Hunt" }, Track = "Room 7" },
                        new SessionData { Name = "Designing great progressive web apps", Speakers = new[] { "Nicole Saidy" }, Track = "Room 8" },
                        new SessionData { Name = "An Opinionated, Maintainable REST API Architecture for ASP.NET Core", Speakers = new[] { "Spencer Schneidenbach" }, Track = "Room 9" },
                    }
                });

                foreach (var group in sessionGroups)
                {
                    AddSessions(group);
                }

                db.SaveChanges();
            }
        }
    }
}