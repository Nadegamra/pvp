using Backend.Data.Models;


namespace Backend.Data.Views.Product
{
    public class ProductGet
    {
        public int Id { get; set; }
        public int ManufacturerId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal CurrentDiscount { get; set; }
        public decimal PriceEurNoTaxes { get; set; }
        public virtual ICollection<ProductImageGet>? Images { get; set; }
        
    }
}
