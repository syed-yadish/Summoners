namespace Summoners.Api.Models;

public class PostDTO
{
    public int PostId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    // public List<Comment>? PostComments { get; set; }
}