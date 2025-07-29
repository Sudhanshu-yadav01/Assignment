import React, {useState, useEffect, useRef} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

import {OverlayPanel} from "primereact/overlaypanel";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import type {Artwork, DataTableLazyParams} from "../types/artwork";
import {artworkService} from "../services/artworkService";

// Main component for displaying the table format
const ArtworkDataTable: React.FC = () => {
  // State variables for managing table data and UI
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [first, setFirst] = useState<number>(0); // First record index for pagination
  const [rows, setRows] = useState<number>(10); // Number of rows per page
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [selectAll, setSelectAll] = useState<boolean | null>(false);
  const [rowCountInput, setRowCountInput] = useState<string>("");
  // Keep track for cross-page selection
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);

  // Ref for overlay panel
  const overlayPanelRef = useRef<OverlayPanel>(null);

  // Load initial data when component mounts
  useEffect(() => {
    loadArtworks();
  }, []);

  // Function to fetch artwork data from API
  const loadArtworks = async (params?: DataTableLazyParams) => {
    setLoading(true);
    try {
      // Calculate which page to load based on pagination parameters
      const page = params ? Math.floor(params.first / params.rows) + 1 : 1;
      const limit = params?.rows || rows;

      // Call the API service
      const response = await artworkService.getArtworks(page, limit);

      // Update state with new data
      setArtworks(response.data);
      setTotalRecords(response.pagination.total);

      // Update our complete artwork collection for selection purposes
      // This helps with cross-page selection functionality
      if (page === 1) {
        setAllArtworks(response.data);
      } else {
        setAllArtworks((prev) => {
          // Remove duplicates and add new artworks
          const existing = prev.filter(
            (artwork) =>
              !response.data.find((newArt) => newArt.id === artwork.id)
          );
          return [...existing, ...response.data];
        });
      }

      // Update pagination state if parameters were provided
      if (params) {
        setFirst(params.first);
        setRows(params.rows);
      }
    } catch (error) {
      console.error("Failed to load artworks:", error);
      // Log error for debugging
      alert("Failed to load artworks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Handle page changes in the DataTable
  const onPage = (event: any) => {
    const params: DataTableLazyParams = {
      first: event.first,
      rows: event.rows,
      page: event.page,
    };
    loadArtworks(params);
  };

  // Handle row selection changes
  const onSelectionChange = (e: any) => {
    setSelectedArtworks(e.value);
    updateSelectAll(e.value);
  };

  // Handle "select all" checkbox changes
  const onSelectAllChange = (e: any) => {
    const checked = e.checked;
    setSelectAll(checked);

    if (checked) {
      // Select all currently visible artworks
      setSelectedArtworks([...artworks]);
    } else {
      // Deselect all
      setSelectedArtworks([]);
    }
  };

  // Update the  checkbox based on current selection
  const updateSelectAll = (selection: Artwork[]) => {
    if (selection.length === 0) {
      setSelectAll(false); // Nothing selected
    } else if (selection.length === artworks.length) {
      setSelectAll(true); // All visible rows selected
    } else {
      setSelectAll(null); // Partial selection
    }
  };

  const handleSelectSpecificRows = async (count: number) => {
    if (count <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    try {
      // If we need more rows than what's currently loaded, load more pages
      const totalNeeded = count;
      let allLoadedArtworks = [...allArtworks];

      // Load additional pages if needed
      if (allLoadedArtworks.length < totalNeeded) {
        const pagesNeeded = Math.ceil(totalNeeded / rows);
        const currentPages = Math.ceil(allLoadedArtworks.length / rows);

        for (let page = currentPages + 1; page <= pagesNeeded; page++) {
          const response = await artworkService.getArtworks(page, rows);
          allLoadedArtworks = [...allLoadedArtworks, ...response.data];
        }

        setAllArtworks(allLoadedArtworks);
      }

      // Select the first 'count' number of artworks
      const selectedRows = allLoadedArtworks.slice(0, totalNeeded);
      setSelectedArtworks(selectedRows);
      updateSelectAll(
        selectedRows.filter((artwork) =>
          artworks.find((art) => art.id === artwork.id)
        )
      );

      console.log(`Selected ${selectedRows.length} rows.`);

      overlayPanelRef.current?.hide();
      setRowCountInput("");
    } catch (error) {
      console.error("Error selecting rows:", error);
      alert("Failed to select rows. Please try again.");
    }
  };

  const onChevronClick = (event: React.MouseEvent) => {
    overlayPanelRef.current?.toggle(event);
  };

  const onRowCountSubmit = () => {
    const count = parseInt(rowCountInput);
    if (!isNaN(count)) {
      handleSelectSpecificRows(count);
    }
  };

  const headerCheckbox = (
    <div style={{display: "flex", alignItems: "center", gap: "4px"}}>
     
      
      <OverlayPanel ref={overlayPanelRef} style={{width: "350px"}}>
        <div className="selection-overlay">
          <h4 style={{margin: "0 0 10px 0", fontSize: "14px"}}>Select Rows</h4>
        
          <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
            <InputText
              value={rowCountInput}
              onChange={(e) => setRowCountInput(e.target.value)}
              placeholder="Enter number"
              type="number"
              min="1"
              style={{flex: 1, fontSize: "12px"}}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onRowCountSubmit();
                }
              }}
            />
            <Button
              label="Select"
              size="small"
              onClick={onRowCountSubmit}
              style={{fontSize: "11px", padding: "4px 8px"}}
            />
          </div>
          <small style={{color: "#666", marginTop: "8px", display: "block"}}>
            Currently selected: {selectedArtworks.length} rows
          </small>
        </div>
      </OverlayPanel>

      <FontAwesomeIcon
        icon={faChevronDown}
        style={{cursor: "pointer", fontSize: "12px", color: "#078afdff"}}
        onClick={onChevronClick}
        title="Select specific number of rows"
      />
    </div>
  );

  const titleBodyTemplate = (rowData: Artwork) => {
    return (
      <div style={{maxWidth: "100px", wordWrap: "break-word"}}>
        {rowData.title || "Untitled"}
      </div>
    );
  };

  const placeOfOriginBodyTemplate = (rowData: Artwork) => {
    return rowData.place_of_origin || "Unknown";
  };

  const artistDisplayBodyTemplate = (rowData: Artwork) => {
    return (
      <div style={{maxWidth: "150px", wordWrap: "break-word"}}>
        {rowData.artist_display || "Unknown Artist"}
      </div>
    );
  };

  const inscriptionsBodyTemplate = (rowData: Artwork) => {
    return (
      <div style={{maxWidth: "150px", wordWrap: "break-word"}}>
        {rowData.inscriptions || "None"}
      </div>
    );
  };

  const dateStartBodyTemplate = (rowData: Artwork) => {
    return rowData.date_start || "Unknown";
  };

  const dateEndBodyTemplate = (rowData: Artwork) => {
    return rowData.date_end || "Unknown";
  };

  return (
    <div className="artwork-datatable">
      <div className="card">
        <h2>Art Institute of Chicago - Artworks</h2>
        <p>Selected Artworks: {selectedArtworks.length}</p>

        <DataTable
          value={artworks}
          lazy
          paginator
          rows={rows}
          totalRecords={totalRecords}
          first={first}
          onPage={onPage}
          loading={loading}
          dataKey="id"
          selection={selectedArtworks}
          onSelectionChange={onSelectionChange}
          selectionMode="multiple"
          selectAll={selectAll ?? false}
          onSelectAllChange={onSelectAllChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          emptyMessage="No artworks found."
          className="p-datatable-gridlines"
          stripedRows
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{width: "3rem"}}
            header={headerCheckbox}
          />

          <Column
            field="title"
            header="Title"
            body={titleBodyTemplate}
            
            style={{minWidth: "200px"}}
          />

          <Column
            field="place_of_origin"
            header="Place of Origin"
            body={placeOfOriginBodyTemplate}
            
            style={{minWidth: "150px"}}
          />

          <Column
            field="artist_display"
            header="Artist"
            body={artistDisplayBodyTemplate}
           
            style={{minWidth: "150px"}}
          />

          <Column
            field="inscriptions"
            header="Inscriptions"
            body={inscriptionsBodyTemplate}
            style={{minWidth: "150px"}}
          />

          <Column
            field="date_start"
            header="Date Start"
            body={dateStartBodyTemplate}
            
            style={{minWidth: "100px"}}
          />

          <Column
            field="date_end"
            header="Date End"
            body={dateEndBodyTemplate}
            
            style={{minWidth: "100px"}}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default ArtworkDataTable;
