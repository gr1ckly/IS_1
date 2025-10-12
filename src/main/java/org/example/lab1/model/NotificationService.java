package org.example.lab1.model;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class NotificationService {

    private final CopyOnWriteArrayList<SseEmitter> emitters;

    public NotificationService() {
        this.emitters = new CopyOnWriteArrayList<>();
    }

    public NotificationService(CopyOnWriteArrayList<SseEmitter> emitters) {
        this.emitters = emitters;
    }

    public void SendMessage(String message) throws Exception {
        for (SseEmitter currEmitter : this.emitters) {
            currEmitter.send(message);
        }
    }

    public void RegisterSseEmitter(SseEmitter emitter) {
        this.emitters.add(emitter);
    }

    public void UnregisterSseEmitter(SseEmitter emitter) {
        this.emitters.remove(emitter);
    }
}
