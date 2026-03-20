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
    public IActionResult UpdateStatus([FromBody] dynamic data)
    {
        int index = data.index;
        string status = data.status;

        if (index < 0 || index >= OrderStore.Orders.Count)
        {
            return BadRequest(new { message = "Invalid order index" });
        }

        OrderStore.Orders[index].Status = status;

        return Ok(new { message = "Status updated" });
    }
}