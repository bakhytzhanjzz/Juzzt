package com.juzzt.service;

import com.juzzt.model.Playlist;
import com.juzzt.model.User;
import com.juzzt.repository.PlaylistRepository;
import com.juzzt.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;

    public PlaylistService(PlaylistRepository playlistRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
    }

    public List<Playlist> getPlaylistsByUserId(Long userId) {
        return playlistRepository.findByUserId(userId);
    }

    public Playlist createPlaylist(Long userId, String name) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Playlist playlist = new Playlist();
            playlist.setUser(user.get());
            playlist.setName(name);
            return playlistRepository.save(playlist);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
