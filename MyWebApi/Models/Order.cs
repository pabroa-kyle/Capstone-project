using System.Collections.Generic;

public class Order
{
    public double TotalAmount { get; set; }
    public string PaymentMethod { get; set; }
    public List<CartItem> Items { get; set; }

    public string Status { get; set; } = "Pending"; // ✅ NEW
}