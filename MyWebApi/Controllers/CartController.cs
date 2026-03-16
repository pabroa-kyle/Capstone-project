using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace MyWebApi.Controllers
{

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{

    [HttpPost("checkout")]
    public IActionResult Checkout([FromBody] List<CartItem> cartItems)
    {

        if (cartItems == null || cartItems.Count == 0)
        {
            return BadRequest(new { message = "Cart is empty" });
        }

        double total = cartItems.Sum(item => item.Price * item.Quantity);

        return Ok(new
        {
            message = "Order successful",
            totalAmount = total
        });

    }

}
}