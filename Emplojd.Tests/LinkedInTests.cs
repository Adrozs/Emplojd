using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Emplojd.Server.Controllers;
using Emplojd.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using AspNet.Security.OAuth.LinkedIn;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc.Routing;

namespace Emplojd.Tests
{
    [TestClass]
    public class LinkedInControllerTests
    {
        private Mock<IConfiguration> _mockConfiguration;
        private Mock<UserManager<User>> _mockUserManager;
        private Mock<ILogger<LinkedInController>> _mockLogger;
        private LinkedInController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockConfiguration = new Mock<IConfiguration>();
            _mockUserManager = MockUserManager<User>();
            _mockLogger = new Mock<ILogger<LinkedInController>>();

            // Mock the IUrlHelper
            var mockUrlHelper = new Mock<IUrlHelper>();
            mockUrlHelper
                .Setup(u => u.Action(It.IsAny<UrlActionContext>()))
                .Returns("https://localhost:54686/linkedinresponse");

            _controller = new LinkedInController(_mockConfiguration.Object, _mockUserManager.Object, _mockLogger.Object)
            {
                Url = mockUrlHelper.Object 
            };
        }

        [TestMethod]
        public void LinkedInLogin_ReturnsChallenge()
        {
            // Act
            var result = _controller.LinkedInLogin();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ChallengeResult));
            var challengeResult = result as ChallengeResult;
            Assert.IsNotNull(challengeResult);
            Assert.AreEqual("LinkedIn", challengeResult.AuthenticationSchemes[0]);
            Assert.AreEqual("https://localhost:54686/linkedinresponse", challengeResult.Properties.RedirectUri); 
        }

        [TestMethod]
        public async Task LinkedInResponse_NoClaimsPrincipal_ReturnsBadRequest()
        {
            // Arrange
            var mockHttpContext = new Mock<HttpContext>();
            var mockAuthService = new Mock<IAuthenticationService>();
            mockAuthService.Setup(s => s.AuthenticateAsync(It.IsAny<HttpContext>(), "LinkedIn"))
                           .ReturnsAsync(AuthenticateResult.NoResult());
            mockHttpContext.Setup(c => c.RequestServices.GetService(typeof(IAuthenticationService)))
                           .Returns(mockAuthService.Object);
            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = mockHttpContext.Object
            };

            // Act
            var result = await _controller.LinkedInResponse();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual("Failed to login with LinkedIn", badRequestResult.Value);
        }

        private static Mock<UserManager<TUser>> MockUserManager<TUser>() where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var options = new Mock<IOptions<IdentityOptions>>();
            var passwordHasher = new Mock<IPasswordHasher<TUser>>();
            var userValidators = new List<IUserValidator<TUser>>();
            var passwordValidators = new List<IPasswordValidator<TUser>>();
            var normalizer = new Mock<ILookupNormalizer>();
            var describer = new Mock<IdentityErrorDescriber>();
            var services = new Mock<IServiceProvider>();
            var logger = new Mock<ILogger<UserManager<TUser>>>();

            return new Mock<UserManager<TUser>>(store.Object, options.Object, passwordHasher.Object, userValidators, passwordValidators, normalizer.Object, describer.Object, services.Object, logger.Object);
        }
    }
}

