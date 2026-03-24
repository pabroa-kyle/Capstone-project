using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    [HttpGet("orders")]
    public IActionResult GetOrders()
    {
        return Ok(OrderStore.Orders);
    }

    // ✅ UPDATE STATUS
    [HttpPost("update-status")]
public IActionResult UpdateStatus([FromBody] UpdateStatusRequest request)
{
    if (request == null)
    {
        return BadRequest(new { message = "Request is null" });
    }

    if (request.Index < 0 || request.Index >= OrderStore.Orders.Count)
    {
        return BadRequest(new { message = "Invalid index" });
    }

    OrderStore.Orders[request.Index].Status = request.Status;

    return Ok(new { message = "Status updated" });
}
}