using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/payment")]
public class PaymentController : ControllerBase
{
    [HttpPost("process")]
public IActionResult ProcessPayment([FromBody] PaymentRequest request)
{
    if (request == null || request.TotalAmount <= 0)
    {
        return BadRequest(new { message = "Invalid payment" });
    }

    var order = new Order
    {
        CustomerName = request.CustomerName, // ✅ SAVE NAME
        TotalAmount = request.TotalAmount,
        PaymentMethod = request.PaymentMethod,
        Items = request.Items,
        Status = "Pending"
    };

    OrderStore.Orders.Add(order);

    return Ok(new
    {
        message = "Payment successful! Order placed.",
        total = request.TotalAmount
    });
}
}