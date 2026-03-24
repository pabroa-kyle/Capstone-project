using System.Collections.Generic;

public class Order
{
    public string CustomerName { get; set; } // ✅ NEW
    public double TotalAmount { get; set; }
    public string PaymentMethod { get; set; }
    public List<CartItem> Items { get; set; }
    public string Status { get; set; } = "Pending";
}