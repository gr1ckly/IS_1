package org.example.lab1.model;

import org.springframework.scheduling.annotation.Scheduled;
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

    public void sendMessage(String message) throws Exception {
        for (SseEmitter currEmitter : this.emitters) {
            currEmitter.send(SseEmitter.event().name("update"));
        }
    }

    @Scheduled(initialDelay = 1000, fixedRate = 15000)
    public void sendKeepAlive() {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("ping"));
            } catch (Exception e) {
                unregisterSseEmitter(emitter);
            }
        }
    }

    public void registerSseEmitter(SseEmitter emitter) {
        this.emitters.add(emitter);
    }

    public void unregisterSseEmitter(SseEmitter emitter) {
        this.emitters.remove(emitter);
    }
}
