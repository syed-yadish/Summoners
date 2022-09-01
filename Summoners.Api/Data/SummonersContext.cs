using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Summoners.Api.Models;

    public class SummonersContext : DbContext
    {
        public SummonersContext (DbContextOptions<SummonersContext> options)
            : base(options)
        {
        }

        public DbSet<Summoners.Api.Models.User> Users { get; set; } = default!;
        public DbSet<Summoners.Api.Models.Post> Posts { get; set; } = default!;
        public DbSet<Summoners.Api.Models.Comment> Comments { get; set; } = default!;
    }
