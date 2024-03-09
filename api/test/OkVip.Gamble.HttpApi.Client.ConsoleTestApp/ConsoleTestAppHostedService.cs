using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp;

namespace OkVip.Gamble.HttpApi.Client.ConsoleTestApp;

public class ConsoleTestAppHostedService : IHostedService
{
	private readonly IConfiguration _configuration;

	public ConsoleTestAppHostedService(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public async Task StartAsync(CancellationToken cancellationToken)
	{
		using (var application = await AbpApplicationFactory.CreateAsync<GambleConsoleApiClientModule>(options =>
		{
			options.Services.ReplaceConfiguration(_configuration);
			options.UseAutofac();
		}))
		{
			await application.InitializeAsync();

			var demo = application.ServiceProvider.GetRequiredService<ClientDemoService>();
			await demo.RunAsync();

			await application.ShutdownAsync();
		}
	}

	public Task StopAsync(CancellationToken cancellationToken)
	{
		return Task.CompletedTask;
	}
}