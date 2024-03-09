﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace OkVip.Gamble.HttpApi.Client.ConsoleTestApp;

internal class Program
{
	public static IHostBuilder CreateHostBuilder(string[] args) =>
		Host.CreateDefaultBuilder(args)
			.AddAppSettingsSecretsJson()
			.ConfigureServices((hostContext, services) =>
			{
				services.AddHostedService<ConsoleTestAppHostedService>();
			});

	private static async Task Main(string[] args)
	{
		await CreateHostBuilder(args).RunConsoleAsync();
	}
}