using System.Security.Claims;
using System.Text.Json;
using Emplojd.Data;
using Emplojd.Exceptions.JobAdExceptions;
using Emplojd.Models;
using Emplojd.Repositories;
using Emplojd.ViewModels;
using Emplojd.ViewModels___DTOs.JobAds;
using Emplojd.ViewModels___DTOs.SavedJobAdDto;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Assert = Xunit.Assert;

[TestClass]
public class JobAdRepositoryTests
{
    private readonly Mock<ApplicationContext> _mockContext;
    private readonly JobAdRepository _repository;

    public JobAdRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationContext>()
            .UseInMemoryDatabase(databaseName: "JobAdDb")
            .Options;
        _mockContext = new Mock<ApplicationContext>(options);
        _repository = new JobAdRepository(_mockContext.Object);
    }

    [TestMethod]
    public async Task GetJobAdsAsync_ReturnsListOfJobAds()
    {
        // Arrange
        var search = "developer";
        int? region = null;
        int? pageIndex = 1;
        var expectedJobAds = new List<JobDto> { new JobDto { Id = "1", Headline = "Developer" } };

        var httpClientMock = new Mock<HttpClient>();
        var responseMessage = new HttpResponseMessage
        {
            StatusCode = System.Net.HttpStatusCode.OK,
            Content = new StringContent(JsonSerializer.Serialize(new JobSearchResultWrapper { Jobs = expectedJobAds }))
        };

        httpClientMock.Setup(x => x.GetAsync(It.IsAny<string>())).ReturnsAsync(responseMessage);

        // Act
        var result = await _repository.GetJobAdsAsync(search, region, pageIndex);

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.Equal("Developer", result[0].Headline);
    }

    [TestMethod]
    public async Task GetJobAdFromIdAsync_ReturnsJobAd()
    {
        // Arrange
        var adId = 1;
        var expectedJobAd = new JobDto { Id = adId.ToString(), Headline = "Developer" };

        var httpClientMock = new Mock<HttpClient>();
        var responseMessage = new HttpResponseMessage
        {
            StatusCode = System.Net.HttpStatusCode.OK,
            Content = new StringContent(JsonSerializer.Serialize(expectedJobAd))
        };

        httpClientMock.Setup(x => x.GetAsync(It.IsAny<string>())).ReturnsAsync(responseMessage);

        // Act
        var result = await _repository.GetJobAdFromIdAsync(adId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(adId.ToString(), result.Id);
        Assert.Equal("Developer", result.Headline);
    }

    [TestMethod]
    public async Task SaveJobAdAsync_ReturnsTrue_WhenJobAdIsSaved()
    {
        // Arrange
        var saveRequest = new SaveJobAdRequest
        {
            PlatsbankenJobAdId = 1,
            Headline = "Developer",
            Employer = "Company",
            Description = "Job description",
            Employment_Type = "Full-time",
            Working_Hours_Type = "Day",
            Occupation = "Developer",
            Workplace_Address = "Address",
            Publication_Date = DateTime.Now.ToString("yyyy-MM-dd"),
            Logo_Url = "http://logo.url"
        };

        var userClaims = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Email, "test@example.com")
        }));

        var user = new User
        {
            Email = "test@example.com",
            SavedJobAds = new List<SavedJobAd>()
        };

        var usersDbSetMock = CreateDbSetMock(new List<User> { user });

        _mockContext.Setup(x => x.Users).Returns(usersDbSetMock.Object);
        _mockContext.Setup(x => x.SaveChangesAsync(default)).ReturnsAsync(1);

        // Act
        var result = await _repository.SaveJobAdAsync(saveRequest, userClaims);

        // Assert
        Assert.True(result);
        _mockContext.Verify(x => x.SaveChangesAsync(default), Times.Once);
    }

    [TestMethod]
    public async Task RemoveSavedJobAdAsync_ReturnsTrue_WhenJobAdIsRemoved()
    {
        // Arrange
        var jobAdId = 1;
        var userClaims = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Email, "test@example.com")
        }));

        var savedJobAd = new SavedJobAd { PlatsbankenJobAdId = jobAdId };
        var user = new User
        {
            Email = "test@example.com",
            SavedJobAds = new List<SavedJobAd> { savedJobAd }
        };

        var usersDbSetMock = CreateDbSetMock(new List<User> { user });

        _mockContext.Setup(x => x.Users).Returns(usersDbSetMock.Object);
        _mockContext.Setup(x => x.SaveChangesAsync(default)).ReturnsAsync(1);


        // Act
        var result = await _repository.RemoveSavedJobAdAsync(jobAdId, userClaims);

        // Assert
        Assert.True(result);
        _mockContext.Verify(x => x.SaveChangesAsync(default), Times.Exactly(2));
    }

    private Mock<DbSet<T>> CreateDbSetMock<T>(List<T> elements) where T : class
    {
        var elementsAsQueryable = elements.AsQueryable();
        var dbSetMock = new Mock<DbSet<T>>();

        dbSetMock.As<IQueryable<T>>().Setup(m => m.Provider).Returns(elementsAsQueryable.Provider);
        dbSetMock.As<IQueryable<T>>().Setup(m => m.Expression).Returns(elementsAsQueryable.Expression);
        dbSetMock.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(elementsAsQueryable.ElementType);
        dbSetMock.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(elementsAsQueryable.GetEnumerator());

        return dbSetMock;
    }
}
