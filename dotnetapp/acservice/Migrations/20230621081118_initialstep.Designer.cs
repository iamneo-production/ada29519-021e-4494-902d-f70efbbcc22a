﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using acservice.Database;

namespace acservice.Migrations
{
    [DbContext(typeof(AC_ServerDbContext))]
    [Migration("20230621081118_initialstep")]
    partial class initialstep
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("acservice.Models.AdminModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("mobileNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userRole")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("acservice.Models.LoginModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("LoginModels");
                });

            modelBuilder.Entity("acservice.Models.ProductModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("contactNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("dateOfPurchase")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("maildid")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("problemDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("productModelNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("productName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("servicecenter")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("time")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("acservice.Models.ServiceCenterModel", b =>
                {
                    b.Property<string>("serviceCenterID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("serviceCenterAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("serviceCenterDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("serviceCenterImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("serviceCenterName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("serviceCenterPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("serviceCenteramailId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("serviceCenterID");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("acservice.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("confirmpassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("mobileNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userRole")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
