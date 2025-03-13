package com.juzzt.config;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dnlllxziw",
                "api_key", "554754152922542",
                "api_secret", "9VZq7cp3129dhLGi-0szfzPYSO8"
        ));
    }
}
