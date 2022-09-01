namespace Summoners.Api.Models;

public class User
{
    public int Id { get; set; }
    public string? SummonerName { get; set; }
    public List<Post>? Posts { get; set; }
}