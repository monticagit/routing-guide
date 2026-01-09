// Routing Guide Application
class RoutingGuide {
    constructor() {
        this.stops = [];
        this.map = null;
        this.markers = [];
        this.routePolyline = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initMap();
        this.loadFromStorage();
    }

    setupEventListeners() {
        document.getElementById('add-stop-btn').addEventListener('click', () => this.addStop());
        document.getElementById('optimize-btn').addEventListener('click', () => this.optimizeRoute());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearAll());
        document.getElementById('export-btn').addEventListener('click', () => this.exportRoute());
        
        // Allow Enter key to add stop
        document.getElementById('stop-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addStop();
            }
        });

        // Initialize drag and drop
        this.setupDragAndDrop();
    }

    initMap() {
        // Initialize map centered on USA
        this.map = L.map('map').setView([39.8283, -98.5795], 4);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);
    }

    setupDragAndDrop() {
        const stopsList = document.getElementById('stops-list');
        
        stopsList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('stop-item')) {
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', e.target.outerHTML);
                e.dataTransfer.setData('text/plain', e.target.dataset.index);
            }
        });

        stopsList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = stopsList.querySelector('.dragging');
            if (!dragging) return;
            
            const afterElement = this.getDragAfterElement(stopsList, e.clientY);
            const stopItem = e.target.closest('.stop-item');
            
            if (stopItem && stopItem !== dragging) {
                if (afterElement == null) {
                    stopsList.appendChild(dragging);
                } else {
                    stopsList.insertBefore(dragging, afterElement);
                }
            }
        });

        stopsList.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('stop-item')) {
                e.target.classList.remove('dragging');
                this.updateStopOrder();
                this.renderStops();
                this.updateMap();
            }
        });

        stopsList.addEventListener('drop', (e) => {
            e.preventDefault();
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.stop-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    addStop() {
        const nameInput = document.getElementById('stop-name');
        const notesInput = document.getElementById('stop-notes');
        
        const name = nameInput.value.trim();
        if (!name) {
            alert('Please enter a stop name or address');
            return;
        }

        const stop = {
            id: Date.now(),
            name: name,
            notes: notesInput.value.trim() || '',
            position: null // Will be geocoded
        };

        this.stops.push(stop);
        nameInput.value = '';
        notesInput.value = '';
        nameInput.focus();

        this.geocodeStop(stop);
        this.renderStops();
        this.saveToStorage();
    }

    async geocodeStop(stop) {
        try {
            // Using Nominatim geocoding (free, no API key required)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(stop.name)}&limit=1`,
                {
                    headers: {
                        'User-Agent': 'RoutingGuideApp/1.0'
                    }
                }
            );
            
            const data = await response.json();
            if (data && data.length > 0) {
                stop.position = {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
                this.updateMap();
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            // Continue without position - user can still manually arrange stops
        }
    }

    removeStop(id) {
        this.stops = this.stops.filter(stop => stop.id !== id);
        this.renderStops();
        this.updateMap();
        this.saveToStorage();
    }

    moveStopUp(index) {
        if (index > 0) {
            [this.stops[index], this.stops[index - 1]] = [this.stops[index - 1], this.stops[index]];
            this.renderStops();
            this.updateMap();
            this.saveToStorage();
        }
    }

    moveStopDown(index) {
        if (index < this.stops.length - 1) {
            [this.stops[index], this.stops[index + 1]] = [this.stops[index + 1], this.stops[index]];
            this.renderStops();
            this.updateMap();
            this.saveToStorage();
        }
    }

    updateStopOrder() {
        const stopsList = document.getElementById('stops-list');
        const stopItems = stopsList.querySelectorAll('.stop-item');
        const newOrder = [];
        
        stopItems.forEach((item, index) => {
            const id = parseInt(item.dataset.index);
            const stop = this.stops.find(s => s.id === id);
            if (stop) {
                newOrder.push(stop);
            }
        });
        
        this.stops = newOrder;
        this.saveToStorage();
    }

    renderStops() {
        const stopsList = document.getElementById('stops-list');
        const stopCount = document.getElementById('stop-count');
        
        stopCount.textContent = this.stops.length;
        
        if (this.stops.length === 0) {
            stopsList.innerHTML = '<div class="empty-state"><p>No stops added yet. Add your first stop to begin!</p></div>';
            return;
        }

        stopsList.innerHTML = this.stops.map((stop, index) => `
            <div class="stop-item" draggable="true" data-index="${stop.id}">
                <div class="stop-number">${index + 1}</div>
                <div class="stop-content">
                    <div class="stop-name">${this.escapeHtml(stop.name)}</div>
                    ${stop.notes ? `<div class="stop-notes">${this.escapeHtml(stop.notes)}</div>` : ''}
                </div>
                <div class="stop-controls">
                    <button class="control-btn" onclick="routingGuide.moveStopUp(${index})" ${index === 0 ? 'disabled' : ''} title="Move Up">↑</button>
                    <button class="control-btn" onclick="routingGuide.moveStopDown(${index})" ${index === this.stops.length - 1 ? 'disabled' : ''} title="Move Down">↓</button>
                    <button class="control-btn danger" onclick="routingGuide.removeStop(${stop.id})" title="Remove">✕</button>
                </div>
            </div>
        `).join('');

        this.updateSummary();
    }

    updateMap() {
        // Clear existing markers and route
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        
        if (this.routePolyline) {
            this.map.removeLayer(this.routePolyline);
            this.routePolyline = null;
        }

        if (this.stops.length === 0) {
            return;
        }

        // Add markers for each stop
        const positions = [];
        this.stops.forEach((stop, index) => {
            if (stop.position) {
                const marker = L.marker([stop.position.lat, stop.position.lng])
                    .addTo(this.map)
                    .bindPopup(`<b>Stop ${index + 1}:</b><br>${this.escapeHtml(stop.name)}`);
                
                this.markers.push(marker);
                positions.push([stop.position.lat, stop.position.lng]);
            }
        });

        // Draw route polyline if we have at least 2 positions
        if (positions.length >= 2) {
            this.routePolyline = L.polyline(positions, {
                color: '#4F46E5',
                weight: 4,
                opacity: 0.7
            }).addTo(this.map);
            
            // Fit map to show all markers
            if (positions.length > 0) {
                const group = new L.featureGroup(this.markers);
                this.map.fitBounds(group.getBounds().pad(0.1));
            }
        } else if (positions.length === 1) {
            // Center on single marker
            this.map.setView(positions[0], 13);
        }
    }

    async optimizeRoute() {
        if (this.stops.length < 2) {
            alert('Need at least 2 stops to optimize route');
            return;
        }

        // Add visual feedback
        const optimizeBtn = document.getElementById('optimize-btn');
        optimizeBtn.classList.add('optimizing');
        optimizeBtn.disabled = true;
        optimizeBtn.textContent = 'Optimizing...';

        try {
            // Wait for all geocoding to complete
            await Promise.all(this.stops.map(stop => 
                stop.position ? Promise.resolve() : this.geocodeStop(stop)
            ));

            // Filter stops with valid positions
            const validStops = this.stops.filter(s => s.position);
            
            if (validStops.length < 2) {
                alert('Cannot optimize: Need at least 2 stops with valid addresses');
                return;
            }

            // Use nearest neighbor algorithm for optimization
            const optimized = this.nearestNeighborOptimization(validStops);
            
            // Keep stops without positions at the end
            const invalidStops = this.stops.filter(s => !s.position);
            this.stops = [...optimized, ...invalidStops];
            
            this.renderStops();
            this.updateMap();
            this.saveToStorage();
            
            alert(`Route optimized! ${validStops.length} stops reordered for shortest distance.`);
        } catch (error) {
            console.error('Optimization error:', error);
            alert('Error optimizing route. Please try again.');
        } finally {
            optimizeBtn.classList.remove('optimizing');
            optimizeBtn.disabled = false;
            optimizeBtn.textContent = 'Auto-Optimize Route';
        }
    }

    nearestNeighborOptimization(stops) {
        if (stops.length < 2) return stops;

        const optimized = [stops[0]]; // Start with first stop
        const remaining = [...stops.slice(1)];

        while (remaining.length > 0) {
            const current = optimized[optimized.length - 1];
            let nearest = remaining[0];
            let nearestDistance = this.calculateDistance(
                current.position.lat, current.position.lng,
                nearest.position.lat, nearest.position.lng
            );

            // Find nearest unvisited stop
            for (let i = 1; i < remaining.length; i++) {
                const distance = this.calculateDistance(
                    current.position.lat, current.position.lng,
                    remaining[i].position.lat, remaining[i].position.lng
                );
                
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearest = remaining[i];
                }
            }

            optimized.push(nearest);
            remaining.splice(remaining.indexOf(nearest), 1);
        }

        return optimized;
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        // Haversine formula for distance between two coordinates
        const R = 3959; // Earth radius in miles
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    toRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    updateSummary() {
        const summaryStops = document.getElementById('summary-stops');
        summaryStops.textContent = this.stops.length;

        let totalDistance = 0;
        const validStops = this.stops.filter(s => s.position);
        
        for (let i = 0; i < validStops.length - 1; i++) {
            const current = validStops[i];
            const next = validStops[i + 1];
            totalDistance += this.calculateDistance(
                current.position.lat, current.position.lng,
                next.position.lat, next.position.lng
            );
        }

        const totalDistanceEl = document.getElementById('total-distance');
        totalDistanceEl.textContent = totalDistance.toFixed(1) + ' miles';

        // Estimate time (assuming average speed of 45 mph)
        const estimatedTime = (totalDistance / 45) * 60; // in minutes
        const estimatedTimeEl = document.getElementById('estimated-time');
        estimatedTimeEl.textContent = Math.round(estimatedTime) + ' min';
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all stops?')) {
            this.stops = [];
            this.renderStops();
            this.updateMap();
            this.saveToStorage();
        }
    }

    exportRoute() {
        if (this.stops.length === 0) {
            alert('No stops to export');
            return;
        }

        const routeData = {
            stops: this.stops.map((stop, index) => ({
                order: index + 1,
                name: stop.name,
                notes: stop.notes,
                coordinates: stop.position ? {
                    lat: stop.position.lat,
                    lng: stop.position.lng
                } : null
            })),
            exportedAt: new Date().toISOString()
        };

        const json = JSON.stringify(routeData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `route-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    saveToStorage() {
        try {
            localStorage.setItem('routingGuideStops', JSON.stringify(this.stops));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('routingGuideStops');
            if (saved) {
                this.stops = JSON.parse(saved);
                this.renderStops();
                
                // Re-geocode stops that don't have positions
                this.stops.forEach(stop => {
                    if (!stop.position) {
                        this.geocodeStop(stop);
                    }
                });
                
                this.updateMap();
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
const routingGuide = new RoutingGuide();
