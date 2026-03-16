using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/payment")]
public class PaymentController : ControllerBase
{
    [HttpPost("process")]
    public IActionResult ProcessPayment([FromBody] PaymentRequest request)
    {
        if (request == null)
        {
            return BadRequest(new { message = "Invalid request data" });
        }

        Console.WriteLine("Payment Method: " + request.PaymentMethod);
        Console.WriteLine("Total Amount: " + request.TotalAmount);

        if (request.TotalAmount <= 0)
        {
            return BadRequest(new { message = "Invalid total amount" });
        }

        return Ok(new
        {
            message = "Payment successful! Order placed.",
            total = request.TotalAmount
        });
    }
}