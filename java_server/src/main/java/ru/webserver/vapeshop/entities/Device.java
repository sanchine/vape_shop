// Product.java  

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity  
@Data  
@NoArgsConstructor  
@AllArgsConstructor  
@Table(name = "devices")  
public class Device {  
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;  

    @Column(nullable = false)  
    private String name;  

    private String description;  

    @Column(nullable = false)  
    private BigDecimal price;  

    private String type;
    private String image;

    @Column(name = "created_at", updatable = false)  
    private LocalDateTime createdAt = LocalDateTime.now();  
}  