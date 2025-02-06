# Your init script
#
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# An example hack to log to the console when each text editor is saved.
#
# atom.workspace.observeTextEditors (editor) ->
#   editor.onDidSave ->
#     console.log "Saved! #{editor.getPath()}"


		
atom.commands.add 'atom-text-editor', 'custom:cut-line', ->
  editor = atom.workspace.getActiveTextEditor()
  selection = editor.getSelections()
  text = selection[0].getText()
  editor.selectLinesContainingCursors()
  editor.cutSelectedText()
  selection[0].insertText(text.replace(/^[\s]+/gm, ' ').replace(/[\r\n\t]+/gm, ''))
  #selection[0].insertText(text.replace(/\t/g, ''))
  
# for selection in selections ->
#	text = selection.getText()
#	selection.insertText(text.replace(/\n+/g, ' '))