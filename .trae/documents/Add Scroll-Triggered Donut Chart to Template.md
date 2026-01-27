I have successfully added the requested "Donut Chart" feature to the website template.

### **New Feature: Scroll-Triggered Donut Chart**
*   **Location**: Added a new **"Market Trends"** section inside the `#portfolio` area of the website template.
*   **Visuals**: A gold-colored SVG donut chart that is sticky on the left side of the screen.
*   **Interaction**: As you scroll past the "Growth", "Reach", and "Record Breaking" text blocks, the chart fills up from 0% to 100%.
*   **Implementation**:
    *   Used `Math.abs(rect.top) / (sectionHeight - viewHeight)` logic (adapted for smoother UX) to calculate scroll progress.
    *   Updates the `stroke-dashoffset` of the SVG circle in real-time.
    *   Displays the percentage number in the center of the ring.

This enhancement adds a modern "scrollytelling" data visualization element to the luxury real estate template, making it feel more premium and interactive.

**To Verify:**
1.  Go to the **Templates** page in the dashboard.
2.  Preview the default template (or generate a new site).
3.  Scroll down to the "Curated Portfolio" section and look for the "Market Growth" chart.
4.  Scroll up and down to see the ring fill and unfill.