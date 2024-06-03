using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Emplojd.Server.Controllers;
using Emplojd.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.Extensions.Options;
using Emplojd.Controller;
using Microsoft.AspNetCore.Mvc.Routing;

namespace Emplojd.Tests
{
    [TestClass]
    public class GoogleTests
    {
        private Mock<IConfiguration> _mockConfiguration;
        private Mock<UserManager<User>> _mockUserManager;
        private Mock<ILogger<GoogleController>> _mockLogger;
        private GoogleController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockConfiguration = new Mock<IConfiguration>();
            _mockUserManager = MockUserManager<User>();
            _mockLogger = new Mock<ILogger<GoogleController>>();

            _controller = new GoogleController(_mockConfiguration.Object, _mockUserManager.Object, _mockLogger.Object);

            // Mock the IUrlHelper
            var mockUrlHelper = new Mock<IUrlHelper>();
            mockUrlHelper
                .Setup(u => u.Action(It.IsAny<UrlActionContext>()))
                .Returns("https://localhost:54686/googleresponse");

            _controller = new GoogleController(_mockConfiguration.Object, _mockUserManager.Object, _mockLogger.Object)
            {
                Url = mockUrlHelper.Object
            };
        }

        [TestMethod]
        public void GoogleLogin_ReturnsChallenge()
        {

            // Act
            var result = _controller.GoogleLogin();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ChallengeResult));
            var challengeResult = result as ChallengeResult;
            Assert.IsNotNull(challengeResult);
            Assert.AreEqual("https://localhost:54686/googleresponse", challengeResult.Properties.RedirectUri);
        }

        [TestMethod]
        public async Task GoogleResponse_NoClaimsPrincipal_ReturnsBadRequest()
        {
            // Arrange
            var mockHttpContext = new Mock<HttpContext>();
            var mockAuthService = new Mock<IAuthenticationService>();
            mockAuthService.Setup(s => s.AuthenticateAsync(It.IsAny<HttpContext>(), GoogleDefaults.AuthenticationScheme))
                           .ReturnsAsync(AuthenticateResult.NoResult());
            mockHttpContext.Setup(c => c.RequestServices.GetService(typeof(IAuthenticationService)))
                           .Returns(mockAuthService.Object);
            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = mockHttpContext.Object
            };

            // Act
            var result = await _controller.GoogleResponse();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual("Failed to login with Google", badRequestResult.Value);
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