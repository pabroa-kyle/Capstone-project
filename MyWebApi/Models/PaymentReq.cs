using System.Collections.Generic;

public class PaymentRequest
{
    public string PaymentMethod { get; set; }

    public string AccountNumber { get; set; }

    public string CardName { get; set; }

    public string CardNumber { get; set; }

    public double TotalAmount { get; set; }

    public List<CartItem> Items { get; set; }
}