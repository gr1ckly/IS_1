package org.example.lab1.controller;

import org.example.lab1.model.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
public class SseController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get-sse")
    public SseEmitter getSseEmitter() {
        SseEmitter emitter = new SseEmitter(0l);
        emitter.onCompletion(() -> this.notificationService.UnregisterSseEmitter(emitter));
        emitter.onTimeout(() -> this.notificationService.UnregisterSseEmitter(emitter));
        emitter.onError((e) -> this.notificationService.UnregisterSseEmitter(emitter));
        notificationService.RegisterSseEmitter(emitter);
        return emitter;
    }
}
